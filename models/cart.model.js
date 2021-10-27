const sql = require("./db");

const Cart = function (cart) {
  this.MaGH = cart.MaGH;
  this.Username = cart.Username;
};

Cart.create = (newCart, result) => {
  sql.query("INSERT INTO GioHang SET ?", newCart, (err, res) => {
    if (err) {
      console.log("error" + err);
      result(null, err);
      return;
    }
    console.log("Success!");
    result(null, { ...newCart });
  });
};

Cart.find = (MaGH, result) => {
  sql.query(`SELECT * FROM GioHang WHERE MaGH = '${MaGH}'`, (err, res) => {
    if (err) {
      console.log("error" + err);
      result(null, err);
      return;
    }

    if (res.length > 0) {
      result(null, res);
    }else{
      result(null);
    }
  });
};

Cart.getAll = (result) => {
  sql.query("SELECT * FROM GioHang", (err, res) => {
    if (err) {
      console.log(result)
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("user: ", res);
    result(null, res);
  });
};

Cart.delete = (MaGH, result) => {
  sql.query(
    "DELETE FROM GioHang WHERE MaGH=?", MaGH,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("Success!");
      result(null);
    }
  );
};

module.exports = Cart;
