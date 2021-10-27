const sql = require("./db");

const ExportInvoice = function (data) {
  this.MaHDX = data.MaHDX;
  this.SoLuongXuat = data.SoLuongXuat;
  this.NgayLapHDX = data.NgayLapHDX;
  this.MaKH = data.MaKH;
  this.MaKhoHang = data.MaKhoHang;
};

ExportInvoice.create = (newExportInvoice, result) => {
  sql.query("INSERT INTO HoaDonXuat SET ?", newExportInvoice, (err, res) => {
    if (err) {
      console.log("error" + err);
      result(null, err);
      return;
    }
    console.log("Success!");
    result(null, {...newExportInvoice});
  });
};

ExportInvoice.find = (MaHDX, result) => {
  sql.query(`SELECT * FROM HoaDonXuat WHERE MaHDX = '${MaHDX}'`, (err, res) => {
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

ExportInvoice.getAll = (result) => {
  sql.query("SELECT * FROM HoaDonXuat", (err, res) => {
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

ExportInvoice.delete = (MaHDX, result) => {
  sql.query("DELETE FROM HoaDonXuat WHERE MaHDX=?", MaHDX, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Success!");
    result(null);
  });
};

module.exports = ExportInvoice;
