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

ChiTietHoaDonXuat.findHD = (MaHDX, result) => {
  sql.query(`SELECT * FROM ((ChiTietHoaDonXuat INNER JOIN SanPham ON ChiTietHoaDonXuat.MaSP = SanPham.MaSP) INNER JOIN HoaDonXuat ON HoaDonXuat.MaHDX = ChiTietHoaDonXuat.MaHDX) WHERE ChiTietHoaDonXuat.MaHDX='${MaHDX}'`, 
  (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Success!!");
    result(null, res);
  });
};

ChiTietHoaDonXuat.getSumOrder = (MaHDX, result) => {
  sql.query(`SELECT MaHDX, SUM(chitiethoadonxuat.SoLuongXuat*sanpham.GiaSPX) as SUM_ORDER FROM chitiethoadonxuat INNER JOIN sanpham ON chitiethoadonxuat.MaSP = sanpham.MaSP WHERE chitiethoadonxuat.MaHDX='${MaHDX}'`, 
  (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Success!!");
    result(null, res);
  });
};

ChiTietHoaDonXuat.getFindMaSP = (MaSP, result) => {
  sql.query(`SELECT MaSP, SUM(SoLuongXuat) as SUM_SoLuongXuat FROM ChiTietHoaDonXuat WHERE MaSP='${MaSP}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Success!!");
    result(null, res);
  });
};

ChiTietHoaDonXuat.getGroupByMaSP = (result) => {
  sql.query("SELECT sanpham.TenSP, SUM(chitiethoadonxuat.SoLuongXuat) as TopProduct FROM chitiethoadonxuat INNER JOIN sanpham ON chitiethoadonxuat.MaSP = sanpham.MaSP Group By sanpham.MaSP ORDER BY TopProduct DESC LIMIT 3", 
  (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Success!!");
    result(null, res);
  });
};

module.exports = ChiTietHoaDonXuat;
