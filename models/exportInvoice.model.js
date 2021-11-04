const sql = require("./db");

const ExportInvoice = function (data) {
  this.SoLuongXuat = data.SoLuongXuat;
  this.NgayLapHDX = data.NgayLapHDX;
  this.TrangThaiHD = data.TrangThaiHD;
  this.MaSP = data.MaSP;
  this.MaKH = data.MaKH;
  this.MaKhoHang = data.MaKhoHang;
  this.vnp_TransactionNo = data.vnp_TransactionNo;
};

ExportInvoice.create = (newExportInvoice, result) => {
  sql.query("INSERT INTO HoaDonXuat SET ?", newExportInvoice, (err, res) => {
    if (err) {
      console.log("error: " + err);
      result(null, err);
      return;
    }
    console.log("Success!");
    result(null);
  });
};

// ExportInvoice.find = (MaHDX, result) => {
//   sql.query(`SELECT * FROM HoaDonXuat WHERE MaHDX = '${MaHDX}'`, (err, res) => {
//     if (err) {
//       console.log("error" + err);
//       result(null, err);
//       return;
//     }

//     if (res.length > 0) {
//       result(null, res);
//     } else {
//       result(null);
//     }
//   });
// };

// ExportInvoice.getAll = (result) => {
//   sql.query("SELECT * FROM HoaDonXuat", (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }
//     console.log("Producer: ", res);
//     result(null, res);
//   });
// };

ExportInvoice.joinCustomer = (result) => {
  sql.query("SELECT * FROM HoaDonXuat", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Producer: ", res);
    result(null, res);
  });
};

// ExportInvoice.delete = (MaHDX, result) => {
//   sql.query("DELETE FROM HoaDonXuat WHERE MaHDX=?", MaHDX, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }
//     console.log("Success!");
//     result(null);
//   });
// };

module.exports = ExportInvoice;
