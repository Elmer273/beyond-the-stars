module.exports = {
   apps : [{
      script    : "server.js",
      instances : "3",
      exec_mode : "cluster",
      autorestart: true,
      env: {
       "PORT": 5000,
       "NODE_ENV": "development"
       }
   }]
}