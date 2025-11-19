#!/bin/bash

# Deploy Landing Pages App to DigitalOcean Droplet
# This script builds the app and deploys it to the droplet

echo "🚀 Starting deployment to droplet..."

# Step 1: Build the application
echo "📦 Building application..."
npm run build

if [ $? -ne 0 ]; then
  echo "❌ Build failed!"
  exit 1
fi

echo "✅ Build successful!"

# Step 2: Create deployment package
echo "📁 Creating deployment package..."
tar -czf deploy.tar.gz \
  dist/ \
  node_modules/ \
  package.json \
  .env

echo "✅ Package created!"

# Step 3: Upload to droplet
echo "📤 Uploading to droplet..."
scp -o StrictHostKeyChecking=no deploy.tar.gz root@134.199.194.110:/opt/

# Step 4: Deploy on droplet
echo "🔧 Deploying on droplet..."
ssh -o StrictHostKeyChecking=no root@134.199.194.110 << 'ENDSSH'
cd /opt

# Extract
tar -xzf deploy.tar.gz

# Stop existing app if running
pm2 stop app 2>/dev/null || true
pm2 delete app 2>/dev/null || true

# Start app
pm2 start dist/index.js --name app -i 1 --env production

# Save PM2 process list
pm2 save

# Show status
pm2 list

echo "✅ Deployment complete!"
ENDSSH

# Clean up
rm deploy.tar.gz

echo "🎉 Deployment successful!"
echo "Your app is now running on the droplet at http://134.199.194.110:5000"
