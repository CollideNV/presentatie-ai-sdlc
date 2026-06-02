output "cloudfront_url" {
  description = "Public URL of the presentation"
  value       = "https://${aws_cloudfront_distribution.presentation.domain_name}"
}

output "s3_bucket" {
  description = "S3 bucket name (for the deploy script)"
  value       = aws_s3_bucket.presentation.bucket
}

output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID (for cache invalidation)"
  value       = aws_cloudfront_distribution.presentation.id
}
