
module.exports = (app) => {
  const cart = require("../controllers/cart.controller");

  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post("/api/cart/add", cart.create);

  app.get("/api/carts/Username=:Username", cart.findAll);

  app.get("/api/carts/sumproduct/Username=:Username", cart.sumProduct);

  app.get("/api/cart/sumorder/Username=:Username", cart.sumOrder);

  app.get("/api/cart/innerjoin/product/Username=:Username", cart.innerJoinProduct);

  app.put("/api/cart/update", cart.update);

  app.get("/api/cart/fine/Username=:Username/MaSP=:MaSP", cart.findOne);

  app.delete("/api/cart/delete/MaGH=:MaGH", cart.delete);

  app.delete("/api/cart/delete/Username=:Username", cart.deleteAll);
 
};
