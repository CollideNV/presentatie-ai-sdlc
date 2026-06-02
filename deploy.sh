#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# ── Build ──────────────────────────────────────────────────────────────────────
echo "▶ Building..."
npm run build

# ── Read Terraform outputs ─────────────────────────────────────────────────────
echo "▶ Reading Terraform outputs..."
cd terraform
BUCKET=$(terraform output -raw s3_bucket)
DISTRIBUTION_ID=$(terraform output -raw cloudfront_distribution_id)
cd ..

# ── Sync to S3 ─────────────────────────────────────────────────────────────────
echo "▶ Syncing to s3://$BUCKET ..."

# Hashed assets: long cache
aws s3 sync dist/assets "s3://$BUCKET/assets" \
  --cache-control "public, max-age=31536000, immutable" \
  --delete

# index.html: no cache (always fresh)
aws s3 cp dist/index.html "s3://$BUCKET/index.html" \
  --cache-control "no-cache, no-store, must-revalidate"

# Everything else (favicon, public assets)
aws s3 sync dist "s3://$BUCKET" \
  --exclude "assets/*" \
  --exclude "index.html" \
  --cache-control "public, max-age=3600" \
  --delete

# ── Invalidate CloudFront ──────────────────────────────────────────────────────
echo "▶ Invalidating CloudFront distribution $DISTRIBUTION_ID ..."
aws cloudfront create-invalidation \
  --distribution-id "$DISTRIBUTION_ID" \
  --paths "/*" \
  --query "Invalidation.Id" \
  --output text

echo ""
echo "✓ Done. URL: https://$(cd terraform && terraform output -raw cloudfront_url | sed 's|https://||')"
