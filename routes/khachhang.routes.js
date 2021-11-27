
module.exports = (app) => {
  const KhachHang = require("../controllers/khachhang.controller");

  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post("/api/customer/add", KhachHang.create);

  app.get("/api/customer/Username=:Username", KhachHang.findAll);

  app.get("/api/customer/MaKH=:MaKH", KhachHang.findOne);

  app.delete("/api/customer/MaKH=:MaKH", KhachHang.delete);

  app.put("/api/customer/updateKhachHang", KhachHang.updateKhachHang);
 
};
