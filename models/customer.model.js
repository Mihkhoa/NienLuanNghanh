const sql = require("./db");

const Customer = function (customer) {
  this.MaKH = customer.MaKH;
  this.TenKH = customer.TenKH;
  this.SDT = customer.SDT;
  this.Email = customer.Email;
  this.DiaChi = customer.DiaChi;
  this.Username = customer.Username;
};

Customer.create = ( newCustomer, result) => {
  sql.query("INSERT INTO KhachHang SET ?", newCustomer, (err, res) => {
    if (err) {
      console.log("err" + err);
      return res(err, null);
    }
    console.log("Create successfully!");
    result(null, { ...newCustomer });
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
    }else{
      result(null)
    }
  });
};

Customer.getAll = (result) => {
  sql.query("SELECT * FROM KhachHang", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

Customer.delete = (MaKH, result) => {
  sql.query(
    "DELETE FROM Image WHERE MaSP=?", MaKH,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("Success!");
      result(null);
    }
  );
};

module.exports = Customer;
