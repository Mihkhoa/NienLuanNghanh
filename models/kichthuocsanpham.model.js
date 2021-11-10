const sql = require("./db");

const Size = function (size) {
  this.ID = size.ID;
  this.KichThuocSP = size.KichThuocSP;
};

Size.create = (newSize, result) => {
  sql.query("INSERT INTO KichThuocSanPham SET ?", newSize, (err, res) => {
    if (err) {
      console.log("error" + err);
      result(null, err);
      return;
    }
    console.log("Success!");
    result(null, { ...newSize });
  });
};

Size.find = (ID, result) => {
  sql.query(`SELECT * FROM KichThuocSanPham WHERE ID = '${ID}'`, (err, res) => {
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

Size.getAll = (result) => {
  sql.query("SELECT * FROM KichThuocSanPham", (err, res) => {
    if (err) {
      console.log(result)
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Get size data success!");
    result(null, res);
  });
};

Size.delete = (ID, result) => {
  sql.query(
    "DELETE FROM KichThuocSanPham WHERE ID=?", ID,
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

module.exports = Size;
