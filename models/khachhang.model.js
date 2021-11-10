const sql = require("./db");

const Customer = function (customer) {
  this.MaKH = customer.MaKH;
  this.TenKH = customer.TenKH;
  this.SDT = customer.SDT;
  this.Email = customer.Email;
  this.DiaChi = customer.DiaChi;
  this.Username = customer.Username;
};

Customer.create = (newCustomer, result) => {
  sql.query("INSERT INTO KhachHang SET ?", newCustomer, (err, res) => {
    if (err) {
      console.log("err" + err);
      return res(err, null);
    }
    console.log("Create successfully!");
    result(null);
  });
};

Customer.find = (MaKH, result) => {
  sql.query(`SELECT * FROM KhachHang WHERE MaKH = '${MaKH}'`, (err, res) => {
    if (err) {
      result(null);
      return;
    }

    if (res.length > 0) {
      result(null, res);
    } else {
      result(null);
    }
  });
};

Customer.getAll = (Username, result) => {
  console.log(Username)
  sql.query(`SELECT * FROM KhachHang WHERE Username='${Username}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.length > 0) {
      console.log("Success!");
      result(null, res);
    } else {
      result(null);
    }
  });
};

Customer.delete = (MaKH, result) => {
  sql.query("DELETE FROM Image WHERE MaSP=?", MaKH, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Success!");
    result(null);
  });
};

module.exports = Customer;
