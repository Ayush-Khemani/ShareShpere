const pool = require('../db/db');

async function testConnection() {
    try {
        const[rows] = await pool.query('SELECT 1');
        console.log("Connection Sucessfull");
        console.log(rows);
        
        
    }catch(err) {
        console.log("Connection not sucessfull", err);
        
    }
}

testConnection();