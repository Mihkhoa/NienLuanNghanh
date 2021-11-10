const sql = require("./db");

const ChiTietHoaDonXuat = function (data) {
  this.MaHDX = data.MaHDX;
  this.SoLuongXuat = data.SoLuongXuat;
  this.MaSP = data.MaSP;
};

ChiTietHoaDonXuat.create = (ChiTietHoaDonXuat, result) => {
  sql.query("INSERT INTO ChiTietHoaDonXuat SET ?", ChiTietHoaDonXuat, (err, res) => {
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

ChiTietHoaDonXuat.findHD = (MaHDX, result) => {
  sql.query(`SELECT * FROM ((ChiTietHoaDonXuat INNER JOIN SanPham ON ChiTietHoaDonXuat.MaSP = SanPham.MaSP) INNER JOIN HoaDonXuat ON HoaDonXuat.MaHDX = ChiTietHoaDonXuat.MaHDX) WHERE ChiTietHoaDonXuat.MaHDX='${MaHDX}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Success!!");
    result(null, res);
  });
};

ChiTietHoaDonXuat.sumOrder = (MaHDX, result) => {
  sql.query(`SELECT MaHDX, SUM(chitiethoadonxuat.SoLuongXuat*sanpham.GiaSPX) as SUM_ORDER FROM chitiethoadonxuat INNER JOIN sanpham ON chitiethoadonxuat.MaSP = sanpham.MaSP WHERE chitiethoadonxuat.MaHDX='${MaHDX}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Success!!");
    result(null, res);
  });
};

// ExportInvoice.joinCustomer = (result) => {
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

module.exports = ChiTietHoaDonXuat;
