# Namecheap API Relay Service

This is a simple Node.js relay service that forwards Namecheap API requests from your Replit application.

## Setup on DigitalOcean Droplet

1. **SSH into your DigitalOcean droplet:**
   ```bash
   ssh root@134.199.194.110
   ```

2. **Install Node.js (if not installed):**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. **Upload these files to your droplet:**
   ```bash
   scp -r namecheap-relay root@134.199.194.110:/root/
   ```

4. **Install dependencies:**
   ```bash
   cd /root/namecheap-relay
   npm install
   ```

5. **Run the service (with PM2 for auto-restart):**
   ```bash
   npm install -g pm2
   pm2 start index.js --name namecheap-relay
   pm2 save
   pm2 startup
   ```

6. **Test it:**
   ```bash
   curl http://localhost:3000/health
   ```

The relay will run on port 3000 and forward all requests to Namecheap's API.

## Security Note
In production, add authentication to the `/namecheap-proxy` endpoint to prevent unauthorized use.
