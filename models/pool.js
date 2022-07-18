if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}

const Pool = require('pg').Pool

let pool = undefined

if (process.env.NODE_ENV === "production") {
   pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DB,
    password: process.env.PG_PW,
    port: process.env.PG_PORT,
    connectionTimeoutMillis: 10000,
    ssl: {
      rejectUnauthorized: false
    }
  });

}
else {
   pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DB,
    password: process.env.PG_PW,
    port: process.env.PG_PORT,
    connectionTimeoutMillis: 10000
  });
}

module.exports = { pool };

