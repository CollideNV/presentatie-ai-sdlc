terraform {
  required_version = ">= 1.5"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

locals {
  bucket_name = "${var.project_name}-${random_id.suffix.hex}"
}

resource "random_id" "suffix" {
  byte_length = 4
}

# ── S3 Bucket ──────────────────────────────────────────────────────────────────

resource "aws_s3_bucket" "presentation" {
  bucket        = local.bucket_name
  force_destroy = true
}

resource "aws_s3_bucket_public_access_block" "presentation" {
  bucket                  = aws_s3_bucket.presentation.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_versioning" "presentation" {
  bucket = aws_s3_bucket.presentation.id
  versioning_configuration {
    status = "Disabled"
  }
}

# ── Origin Access Control ──────────────────────────────────────────────────────

resource "aws_cloudfront_origin_access_control" "presentation" {
  name                              = "${var.project_name}-oac"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

# ── CloudFront Distribution ────────────────────────────────────────────────────

resource "aws_cloudfront_distribution" "presentation" {
  enabled             = true
  default_root_object = "index.html"
  price_class         = "PriceClass_100" # US/Europe only — cheapest

  origin {
    domain_name              = aws_s3_bucket.presentation.bucket_regional_domain_name
    origin_id                = "s3-${local.bucket_name}"
    origin_access_control_id = aws_cloudfront_origin_access_control.presentation.id
  }

  default_cache_behavior {
    target_origin_id       = "s3-${local.bucket_name}"
    viewer_protocol_policy = "redirect-to-https"
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    compress               = true

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    # Long cache for hashed assets, short for index.html
    min_ttl     = 0
    default_ttl = 3600
    max_ttl     = 86400
  }

  # SPA fallback: serve index.html for all 403/404s from S3
  custom_error_response {
    error_code            = 403
    response_code         = 200
    response_page_path    = "/index.html"
    error_caching_min_ttl = 0
  }

  custom_error_response {
    error_code            = 404
    response_code         = 200
    response_page_path    = "/index.html"
    error_caching_min_ttl = 0
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}

# ── Bucket Policy (allow CloudFront OAC) ──────────────────────────────────────

data "aws_iam_policy_document" "s3_cloudfront" {
  statement {
    sid    = "AllowCloudFrontOAC"
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }

    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.presentation.arn}/*"]

    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = [aws_cloudfront_distribution.presentation.arn]
    }
  }
}

resource "aws_s3_bucket_policy" "presentation" {
  bucket = aws_s3_bucket.presentation.id
  policy = data.aws_iam_policy_document.s3_cloudfront.json

  depends_on = [aws_s3_bucket_public_access_block.presentation]
}
