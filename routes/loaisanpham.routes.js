module.exports = (app) => {
  const productType = require("../controllers/loaisanpham.controller");

  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post("/api/productType/add", productType.create);

  app.get("/api/productTypes", productType.findAll);

  app.get("/api/productType/MaLSP=:MaLSP", productType.findOne);

  app.get("/api/productType/innerJoin/MaLSP=:MaLSP", productType.WareHouse);

  app.delete("/api/productType/MaLSP=:MaLSP", productType.delete);
};
