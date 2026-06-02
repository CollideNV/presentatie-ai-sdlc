variable "aws_region" {
  description = "AWS region to deploy into"
  type        = string
  default     = "eu-west-1"
}

variable "project_name" {
  description = "Used as S3 bucket prefix and resource name prefix"
  type        = string
  default     = "bewire-ai-sdlc"
}

variable "github_repo" {
  description = "GitHub repo in owner/name format (for OIDC trust policy)"
  type        = string
  default     = "CollideNV/presentatie-ai-sdlc"
}
