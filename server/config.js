const dotenv = require('dotenv').config();
const path = require('path');

const env_map = {
    local: '.env.local',
    server: '.env.server',
    production: 'env.production'
}

const target = env_map[process.env.APP_ENV] || env_map.local.config({ 
    path: path.resolve('server', target)
})

export const config = {
    port: process.env.PORT || 3000,
    env: process.env.APP_ENV || 'local'
}