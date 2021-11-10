
module.exports = (app) => {
  const exportInvoice = require("../controllers/hoadonxuat.controller");

  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post("/api/exportInvoice/add", exportInvoice.create);

  app.get("/api/exportInvoices/MaKH=:MaKH", exportInvoice.findAll);

  app.get("/api/exportInvoice/MaHDX", exportInvoice.findMaHDX);

  app.get("/api/innerjoin/exportInvoices/customer=:customer", exportInvoice.innerJoinCustomer);

  // app.get("/api/exportInvoice/MaSP=:MaSP", exportInvoice.findOne);

  // app.delete("/api/exportInvoice/MaSP=:MaSP", exportInvoice.delete);
 
};
