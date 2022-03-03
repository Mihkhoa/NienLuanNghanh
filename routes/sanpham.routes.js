module.exports = (app) => {
  const product = require("../controllers/sanpham.controller");

  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post("/api/product/add", product.create);

  app.get("/api/products", product.findAll);

  app.get("/api/products/Sort=:Sort", product.filterSort);

  app.get("/api/products/Sort=:Sort/MaTH=:MaTH", product.filter_MaTH_Sort);

  app.get("/api/product/MaSP=:MaSP", product.findOne);

  app.delete("/api/product/MaSP=:MaSP", product.delete);

  app.get("/api/product/search/TenSP=:TenSP", product.searchProduct);

  app.get("/api/innerjoin/image", product.innerJoinImage);

  app.get("/api/innerjoin/iminvoice", product.innerJoinImInvoice);

  app.get("/api/innerjoin/iminvoice=:MaSP", product.fineOneInnerJoinImInvoice);

  app.put("/api/product/update", product.updateProduct);
};
