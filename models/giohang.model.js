const sql = require("./db");

const Cart = function (cart) {
  this.Username = cart.Username;
  this.MaSP = cart.MaSP;
  this.SLSP = cart.SLSP;
};

Cart.create = (newCart, result) => {
  sql.query("INSERT INTO GioHang SET ?", newCart, (err, res) => {
    if (err) {
      console.log("error" + err);
      result(null, err);
      return;
    }
    console.log("Success!");
    result(null, {...newCart});
  });
};

Cart.find = (MaSP, Username, result) => {
  sql.query(
    `SELECT * FROM GioHang WHERE (Username='${Username}' AND MaSP='${MaSP}')`,
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

Cart.getAll = (Username, result) => {
  sql.query(`SELECT * FROM GioHang WHERE Username='${Username}'`, (err, res) => {
    if (err) {
      console.log(result);
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Success!");
    result(null, res);
  });
};

Cart.joinProduct = (Username, result) => {
  sql.query(`SELECT * FROM ((giohang INNER JOIN sanpham ON giohang.MaSP = sanpham.MaSP) INNER JOIN hinhanhsanpham ON sanpham.MaSP=hinhanhsanpham.MaSP) WHERE giohang.Username='${Username}'`, (err, res) => {
    if (err) {
      console.log(result);
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Success!");
    result(null, res);
  });
};

Cart.SumProduct = (Username, result) => {
  console.log(Username);
  sql.query(
    `SELECT SUM(SLSP) as SLSanPham FROM GioHang WHERE Username='${Username}'`,
    (err, res) => {
      if (err) {
        console.log(result);
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("Success!");
      result(null, res);
    },
  );
};

Cart.SumOrder = (Username, result) => {
  console.log(Username);
  sql.query(
    `SELECT SUM(SLSP*GiaSPX) as sumOrder FROM GioHang INNER JOIN SanPham ON GioHang.MaSP = SanPham.MaSP WHERE Username='${Username}'`,
    (err, res) => {
      if (err) {
        console.log(result);
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("Success!");
      result(null, res);
    },
  );
};

Cart.delete = (MaGH, result) => {
  sql.query(
    `DELETE FROM GioHang WHERE MaGH='${MaGH}'`,
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

Cart.deleteall = (Username, result) => {
  sql.query(
    `DELETE FROM GioHang WHERE Username='${Username}'`,
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

Cart.updateSoLuongSP = (cartData, result) => {
  sql.query(
    "UPDATE GioHang SET SLSP=?  WHERE Username=? AND MaSP=?",
    [cartData.SLSP, cartData.Username, cartData.MaSP],
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

module.exports = Cart;
