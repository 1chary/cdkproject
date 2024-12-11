require('dotenv').config();

const mySql = require("mysql2/promise");

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

const pool = mySql.createPool(dbConfig);

exports.handler = async (event) => {
    console.log('Lambda function started');
   
    try {
      console.log('Connecting to the database...');
      const [rows] = await pool.query('SELECT * FROM users'); 
      
   
      console.log('Fetched data from the database:', rows);
   
      return {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*", 
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE", 
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
        body: JSON.stringify(rows),
      };
    } catch (error) {
      console.error('Error during database operation:', error.message);
   
      return {
        statusCode: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
        body: JSON.stringify({
          message: 'Error fetching data from the database',
          error: error.message,
        }),
      };
    }
  };
