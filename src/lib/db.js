import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",        // default XAMPP user
  password: "",        // your MySQL password if set
  database: "schooldb" // your database
});

export default pool;
