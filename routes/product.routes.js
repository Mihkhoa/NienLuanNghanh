
module.exports = (app) => {
  const product = require("../controllers/product.controller");

  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post("/api/product/add", product.create);

  app.get("/api/products", product.findAll);

  app.get("/api/products/sortbyproduct=:SortBy", product.sortByProduct);

  app.get("/api/product/MaSP=:MaSP", product.findOne);

  app.delete("/api/product/MaSP=:MaSP", product.delete);

  app.get("/api/product/search/TenSP=:TenSP", product.searchProduct);

  app.get("/api/innerjoin/image", product.innerJoinImage);

  app.get("/api/innerjoin/iminvoice", product.innerJoinImInvoice);

  app.get("/api/innerjoin/iminvoice=:MaSP", product.fineOneInnerJoinImInvoice);
 
};
