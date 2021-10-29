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

Cart.getAll = (result) => {
  sql.query("SELECT * FROM GioHang", (err, res) => {
    if (err) {
      console.log(result);
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("user: ", res);
    result(null, res);
  });
};

Cart.Sum = (Username, result) => {
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
      console.log("Success!: ");
      result(null, res);
    },
  );
};

Cart.delete = (Username, MaSP, result) => {
  sql.query(
    `DELETE FROM GioHang WHERE Username=${Username} AND MaSP=${MaSP}`,
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
