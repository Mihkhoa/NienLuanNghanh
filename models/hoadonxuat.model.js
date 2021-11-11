const sql = require("./db");

const ExportInvoice = function (data) {
  this.MaHDX = data.MaHDX;
  this.TinhTrangHD = data.TinhTrangHD;
  this.NgayLapHDX = data.NgayLapHDX;
  this.TrangThaiHD = data.TrangThaiHD;
  this.MaKH = data.MaKH;
  this.MaKhoHang = data.MaKhoHang;
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

ExportInvoice.getMaKH = (MaKH, result) => {
  sql.query(`SELECT * FROM HoaDonXuat WHERE MaKH='${MaKH}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Producer: ", res);
    result(null, res);
  });
};

ExportInvoice.getAll = (result) => {
  sql.query(`SELECT * FROM HoaDonXuat`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Success!");
    result(null, res);
  });
};

ExportInvoice.getMaHDX = (result) => {
  sql.query("SELECT MAX(MaHDX) as MaHDX FROM hoadonxuat", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Producer: ", res);
    result(null, res);
  });
};

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

ExportInvoice.upTrangThaiHD = (data, MaHDX, result) => {
  sql.query(`UPDATE HoaDonXuat SET TrangThaiHD=?, TinhTrangHD=? WHERE MaHDX=${MaHDX}`, [data.TrangThaiHD, data.TinhTrangHD], (err, res) => {
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
