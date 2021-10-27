const sql = require("./db");

const WareHouse = function (wareHouse) {
  this.MaKhoHang = wareHouse.MaKhoHang;
  this.TenKhoHang = wareHouse.TenKhoHang;
  this.DiaChiKhoHang = wareHouse.DiaChiKhoHang;
  this.SDTKhoHang = wareHouse.SDTKhoHang;
  this.MaLSP = wareHouse.MaLSP;
};

WareHouse.create = (newWareHouse, result) => {
  sql.query("INSERT INTO KhoHang SET ?", newWareHouse, (err, res) => {
    if (err) {
      console.log("error" + err);
      result(null, err);
      return;
    }
    console.log("Success!");
    result(null, { ...newWareHouse });
  });
};

WareHouse.find = (MaKhoHang, result) => {
  sql.query(`SELECT * FROM KhoHang WHERE MaKhoHang = '${MaKhoHang}'`, (err, res) => {
    if (err) {
      console.log("error" + err);
      result(null, err);
      return;
    }

    if (res.length > 0) {
      result(null, res);
    }else{
      result(null);
    }
  });
};

WareHouse.getAll = (result) => {
  sql.query("SELECT * FROM KhoHang", (err, res) => {
    if (err) {
      console.log(result)
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("user: ", res);
    result(null, res);
  });
};

WareHouse.delete = (MaKhoHang, result) => {
  sql.query(
    "DELETE FROM Khohang WHERE MaKhoHang=?", MaKhoHang,
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

module.exports = WareHouse;
