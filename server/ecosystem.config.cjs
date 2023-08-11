module.exports = {
   apps : [{
      script    : "server/server.js",
      instances : "3",
      exec_mode : "cluster",
      autorestart: true,
      env: {
       "PORT": 3000,
       "NODE_ENV": "development"
       }
   }]
}