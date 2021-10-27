const mysql = require("mysql");
const config = require("../config/db.config");

// ket noi csdl
const conn = mysql.createConnection({
  host: config.HOST,
  user: config.USER,
  password: config.PASSWORD,
  database: config.DATABASE,
});

// kiểm tra kết nối
conn.query("select 1+1 as solution", (err, rs, _) => {
  if (err) throw err;
  console.log("Connect success database", rs[0].solution);
});

module.exports = conn;
