const sql = require("./db");

const ImportInvoice = function (data) {
  this.NgayLapHDN = data.NgayLapHDN;
  this.SoLuongNhap = data.SoLuongNhap;
  this.GiaSPN = data.GiaSPN;
  this.MaKhoHang = data.MaKhoHang;
  this.MaSP = data.MaSP;
};

ImportInvoice.create = (newImportInvoice, result) => {
  sql.query("INSERT INTO HoaDonNhap SET ?", newImportInvoice, (err, res) => {
    if (err) {
      console.log("error" + err);
      console.log(res)
      result(null, err);
      return;
    }
    console.log("Success!");
    result(null, {...newImportInvoice});
  });
};

ImportInvoice.find = (MaHDN, result) => {
  sql.query(`SELECT * FROM HoaDonNhap WHERE MaHDN = '${MaHDN}'`, (err, res) => {
    if (err) {
      console.log("error" + err);
      result(null, err);
      return;
    }

    if (res.length > 0) {
      result(null, res);
    } else {
      result(null);
    }
  });
};

ImportInvoice.getAll = (result) => {
  sql.query("SELECT * FROM HoaDonNhap", (err, res) => {
    if (err) {
      console.log(result);
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Producer: ", res);
    result(null, res);
  });
};

ImportInvoice.delete = (MaHDN, result) => {
  sql.query("DELETE FROM HoaDonNhap WHERE MaHDN=?", MaHDN, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Success!");
    result(null);
  });
};

module.exports = ImportInvoice;
