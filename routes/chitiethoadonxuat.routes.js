module.exports = (app) => {
  const ChiTietHoaDonXuat = require("../controllers/chitiethoadonxuat.controller");

  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post("/api/chitiethoadonxuat/add", ChiTietHoaDonXuat.create);

  app.get("/api/chitiethoadonxuat/MaHDX=:MaHDX", ChiTietHoaDonXuat.findHD);

  app.get("/api/chitiethoadonxuat/SumOrder/MaHDX=:MaHDX", ChiTietHoaDonXuat.sumOrder);

  // app.get("/api/innerjoin/exportInvoices/customer=:customer", ChiTietHoaDonXuat.innerJoinCustomer);

  // app.get("/api/exportInvoice/MaSP=:MaSP", exportInvoice.findOne);

  // app.delete("/api/exportInvoice/MaSP=:MaSP", exportInvoice.delete);
 
};
