const sql = require("./db");

const Trademark = function (trademark) {
  this.MaTH = producer.MaTH;
  this.TenTH = producer.TenTH;
};

Trademark.create = (newtrademark, result) => {
  sql.query("INSERT INTO ThuongHieu SET ?", newtrademark, (err, res) => {
    if (err) {
      console.log("error" + err);
      result(null, err);
      return;
    }
    console.log("Success!");
    result(null, { ...newtrademark });
  });
};

Trademark.find = (MaTH, result) => {
  sql.query(`SELECT * FROM ThuongHieu WHERE MaTH = '${MaTH}'`, (err, res) => {
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

Trademark.getAll = (result) => {
  sql.query("SELECT * FROM ThuongHieu", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Get trademark success!");
    result(null, res);
  });
};

Trademark.delete = (MaTH, result) => {
  sql.query(
    "DELETE FROM ThuongHieu WHERE MaTH=?", MaTH,
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

module.exports = Trademark;
