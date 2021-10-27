const sql = require("../models/db");
const jwt = require("jsonwebtoken");
const ACCESS_TOKEN_SECRET = require("../config/auth.config");

const User = function (user) {
  this.username = user.username;
  this.password = user.password;
};

User.userLogin = (username, password, result) => {
  sql.query(
    `SELECT * FROM TaiKhoan WHERE Username = '${username}' AND Password = '${password}'`,
    (err, res) => {
      if (err) {
        console.log("err:", err);
        result(null, err);
        return;
      }
      if (res.length > 0) {
        const user = JSON.stringify(res[0]);
        const role = JSON.parse(JSON.stringify(res[0].Role));
        const username = JSON.parse(JSON.stringify(res[0].Username));
        //    Create JWT
        const accessToken = jwt.sign(user , ACCESS_TOKEN_SECRET.secret);
        //
        result(null, {username, accessToken, role});

      } else {
        result(null);
      }
    }
  );
};

module.exports = User;
