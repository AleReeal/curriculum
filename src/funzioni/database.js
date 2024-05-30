const mysql = require('mysql2')
const dotenv = require('dotenv')
dotenv.config()

// Configura i dettagli della connessione
const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: 3333,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'sito' 
  }).promise();

async function querySelect(){
    const a = await db.query('SELECT * FROM conoscenze;');
    return a[0]
}

module.exports = {
    querySelect: querySelect
  }