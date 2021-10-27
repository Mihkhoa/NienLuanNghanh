const sql = require("./db");

const User = function (user) {
  this.Username = user.username;
  this.Password = user.password;
};

// tạo tài khoản
User.createUser = (newUser, result) => {
  console.log(newUser);
  sql.query("INSERT INTO TaiKhoan SET ?", newUser, (err, res) => {
    if (err) {
      console.log("err" + err);
      return res(err, null);
    }
    console.log("Create successfully!");
    result(null, { ...newUser });
  });
};

// Tìm tài khoản
User.findUser = (username, result) => {
  sql.query(`SELECT Username FROM TaiKhoan WHERE Username = '${username}'`, (err, res) => {
    if (err) {
      result(null);
      return;
    }

    if (res.length > 0) {
      result(null, res);
    }else{
      result(null)
    }
  });
};

// Lấy danh sách tài khoản
User.getAll = (result) => {
  sql.query("SELECT * FROM TaiKhoan", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("user: ", res);
    result(null, res);
  });
};

// Cập nhật mật khẩu tài khoản
User.updateUser = (username, user, result) => {
  sql.query(
    "UPDATE TaiKhoan SET Password = ? WHERE Username = ?",
    [user.password, username],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("updated user: ", { ...user });
      result(null, { ...user });
    }
  );
};

module.exports = User;
