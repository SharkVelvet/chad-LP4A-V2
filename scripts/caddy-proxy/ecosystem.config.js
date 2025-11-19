module.exports = {
  apps: [{
    name: 'caddy-proxy',
    script: './server.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '200M',
    env: {
      PORT: 3001,
      NODE_ENV: 'production'
    }
  }]
};
