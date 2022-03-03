const sql = require("./db");

const Product = function (data) {
  this.MaSP = data.MaSP;
  this.TenSP = data.TenSP;
  this.GiaSPX = data.GiaSPX;
  this.MaLSP = data.MaLSP;
  this.MaTH = data.MaTH;
  this.MaKT = data.MaKT;
  this.ThongTinSP = data.ThongTinSP;
};

Product.create = (newProduct, result) => {
  sql.query("INSERT INTO SanPham SET ?", newProduct, (err, res) => {
    if (err) {
      console.log("error" + err);
      result(null, err);
      return;
    }
    console.log("Success!");
    result(null, {...newProduct});
  });
};

Product.find = (MaSP, result) => {
  sql.query(`SELECT * FROM SanPham WHERE MaSP = '${MaSP}'`, (err, res) => {
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

Product.findProduct = (TenSP, result) => {
  sql.query(
    `SELECT SanPham.MaSP, SanPham.TenSP, SanPham.GiaSPX, HinhAnhSanPham.HinhAnhSP FROM SanPham INNER JOIN HinhAnhSanPham ON SanPham.MaSP = HinhAnhSanPham.MaSP WHERE sanpham.TenSP LIKE "%${TenSP}%"`,
    (err, res) => {
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
    },
  );
};

Product.getAll = (result) => {
  sql.query("SELECT * FROM SanPham", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("user: ", res);
    result(null, res);
  });
};

Product.getFilter_Sort = (Sort, result) => {
  sql.query(
    `SELECT SanPham.MaSP, SanPham.TenSP, SanPham.GiaSPX, HinhAnhSanPham.HinhAnhSP FROM SanPham INNER JOIN HinhAnhSanPham ON SanPham.MaSP = HinhAnhSanPham.MaSP ORDER BY sanpham.GiaSPX ${Sort}`,
    (err, res) => {
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
    },
  );
};

Product.getFilter_MaTH_Sort = (SortBy, MaTH, result) => {
  sql.query(
    `SELECT SanPham.MaSP, SanPham.TenSP, SanPham.GiaSPX, HinhAnhSanPham.HinhAnhSP FROM SanPham INNER JOIN HinhAnhSanPham ON SanPham.MaSP = HinhAnhSanPham.MaSP WHERE SanPham.MaTH='${MaTH}' ORDER BY sanpham.GiaSPX ${SortBy}`,
    (err, res) => {
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
    },
  );
};

Product.getAllImage = (result) => {
  sql.query(
    `SELECT SanPham.MaSP, SanPham.TenSP, SanPham.GiaSPX, HinhAnhSanPham.HinhAnhSP FROM SanPham INNER JOIN HinhAnhSanPham ON SanPham.MaSP = HinhAnhSanPham.MaSP`,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(null, err);
        return;
      }
      console.log("SanPham inner join HinhAnhSanPham");
      result(null, res);
    },
  );
};

Product.innerJoin = (result) => {
  sql.query(
    "SELECT * FROM ((SanPham INNER JOIN HoaDonNhap ON SanPham.MaSP = HoaDonNhap.MaSP) INNER JOIN KichThuocSanPham ON SanPham.MaKT = KichThuocSanPham.ID)",
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        return;
      }
      console.log("table SanPham inner join table HoaDonNhap");
      result(null, res);
    },
  );
};

Product.fineOneJoinImInvoice = (MaSP, result) => {
  sql.query(
    `SELECT * FROM SanPham INNER JOIN HoaDonNhap ON SanPham.MaSP = HoaDonNhap.MaSP WHERE SanPham.MaSP='${MaSP}'`,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        return;
      }
      console.log("table SanPham inner join table HoaDonNhap with MaSP");
      result(null, res);
    },
  );
};

Product.remove = (MaSP, result) => {
  sql.query("DELETE FROM SanPham WHERE MaSP=?", MaSP, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Success!");
    result(null);
  });
};

Product.putUpdateProduct = (dataProduct, result) => {
  sql.query(
    "UPDATE SanPham SET TenSP=?, GiaSPX=?, ThongTinSP=?, MaTH=?, MaLSP=?, MaKT=? WHERE MaSP=?",
    [
      dataProduct.TenSP,
      dataProduct.GiaSPX,
      dataProduct.ThongTinSP,
      dataProduct.MaTH,
      dataProduct.MaLSP,
      dataProduct.MaKT,
      dataProduct.MaSP,
    ],
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

module.exports = Product;
