
module.exports = (app) => {
  const importInvoice = require("../controllers/importInvoice.controller");

  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post("/api/importInvoice/add", importInvoice.create);

  app.get("/api/importInvoices", importInvoice.findAll);

  app.get("/api/importInvoice/MaSP=:MaSP", importInvoice.findOne);

  app.delete("/api/importInvoice/MaSP=:MaSP", importInvoice.delete);
 
};
