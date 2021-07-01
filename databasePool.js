const { Pool } = require('pg');
const databaseConfiguration = require('./Secrets/databasePoolConfig');

const pool = new Pool(databaseConfiguration);

module.exports = pool;
