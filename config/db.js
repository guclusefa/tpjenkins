const mysql = require("mysql2");
require("dotenv").config();

let connection;

if (process.env.NODE_ENV !== "test") {
  connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  });

  connection.connect((err) => {
    if (err) {
      return console.log(err);
    }
    console.log("Connecté à la base de données MySQL");
  });
} else {
  connection = {
    query: jest.fn((sql, callback) => {
      callback(null, []);
    }),
    end: jest.fn(),
  };
}

module.exports = connection;
