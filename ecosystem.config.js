module.exports = {
  apps : [{
    name: 'zineteblog',
    autorestart: true,
    script: "server/index.js",

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'one two',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
     "PORT": 6666,
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      user : 'root',
      host : '119.3.236.203',
      ref  : 'origin/master',
      repo : 'git@github.com:zhenghui0705/zinete_blog.git',
      path : '/www/nodeserver/zineteblog',
      'post-deploy' : 
      'git pull origin master && rm -rf node_modules && npm install && npm run build && pm2 reload ecosystem.config.js --env production'
    }
  }
};
