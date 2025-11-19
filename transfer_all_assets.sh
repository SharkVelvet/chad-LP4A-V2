#!/bin/bash
DROPLET_IP="134.199.194.110"
REPLIT_URL=$(echo $REPLIT_DEV_DOMAIN | sed 's/^/https:\/\//')

echo "Transferring all assets from Replit to droplet..."

# Get list of all asset files
cd dist/public/assets
for file in *; do
  if [ -f "$file" ]; then
    echo "Transferring $file..."
    ssh -o StrictHostKeyChecking=no root@$DROPLET_IP "curl -L '$REPLIT_URL/assets/$file' -o '/opt/app/dist/public/assets/$file'"
  fi
done

echo "Transfer complete!"
echo "Verifying files on droplet..."
ssh -o StrictHostKeyChecking=no root@$DROPLET_IP "ls -lah /opt/app/dist/public/assets/ | wc -l"
