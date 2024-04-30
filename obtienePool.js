const { Pool } = require("pg");
require('dotenv').config();

const config = {
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
    max: process.env.PG_POOL_MAX,
    idleTimeoutMillis: process.env.PG_POOL_IDLE_TIMEOUT_MILLIS,
    connectionTimeoutMillis: process.env.PG_POOL_CONNECTION_TIMEOUT_MILLIS,
};

const pool = new Pool(config);

module.exports = {
    pool
};