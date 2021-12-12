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
      console.log(res)
      result(null, err);
      return;
    }
    console.log("Success!");
    result(null, {...newImportInvoice});
  });
};

ImportInvoice.findProduct = (MaSP, result) => {
  sql.query(`SELECT SoLuongNhap FROM HoaDonNhap WHERE MaSP = '${MaSP}'`, (err, res) => {
    if (err) {
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
      result(null, err);
      return;
    }
    console.log("Success!!!");
    result(null, res);
  });
};

ImportInvoice.getSumGiaSPN = (result) => {
  sql.query("SELECT SUM(SoLuongNhap*GiaSPN) as SUM_GiaSPN FROM HoaDonNhap", (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    console.log("Success!!!");
    result(null, res);
  });
};

ImportInvoice.delete = (MaHDN, result) => {
  sql.query("DELETE FROM HoaDonNhap WHERE MaHDN=?", MaHDN, (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    console.log("Success!");
    result(null);
  });
};

ImportInvoice.putUpdateHDN = (dataHDN, result) => {
  sql.query(
    "UPDATE HoaDonNhap SET SoLuongNhap=?, GiaSPN=?, MaKhoHang=? WHERE MaSP=?",
    [dataHDN.SoLuongNhap, dataHDN.GiaSPN, dataHDN.MaKhoHang, dataHDN.MaSP],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("Success!");
      result(null);
    },
  );
};

module.exports = ImportInvoice;
