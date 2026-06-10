const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Goku@17F101uT",
    database: "task_manager_db"
});

connection.connect((err) => {
    if (err) {
        console.log("Database connection failed:", err);
    } else {
        console.log("Connected to MySQL database!");
    }
});

module.exports = connection;