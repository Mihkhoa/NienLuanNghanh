const sql = require("./db");

const Image = function (image) {
  this.HinhAnhSP = image.HinhAnhSP;
  this.MaSP = image.MaSP;
};

Image.create = (newImage, result) => {
  sql.query("INSERT INTO HinhAnhSanPham SET ?", newImage, (err, res) => {
    if (err) {
      console.log("error" + err);
      result(null, err);
      return;
    }
    console.log("Success!");
    result(null, { ...newImage });
  });
};

Image.find = (MaSP, result) => {
  sql.query(`SELECT * FROM HinhAnhSanPham WHERE MaSP = '${MaSP}'`, (err, res) => {
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

Image.getAll = (result) => {
  sql.query("SELECT * FROM HinhAnhSanPham", (err, res) => {
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

Image.delete = (MaSP, result) => {
  sql.query(
    "DELETE FROM HinhAnhSanPham WHERE MaSP=?", MaSP,
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

module.exports = Image;
