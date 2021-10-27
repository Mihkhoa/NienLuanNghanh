
module.exports = (app) => {
  const cart = require("../controllers/cart.controller");

  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post("/api/cart/add", cart.create);

  app.get("/api/carts", cart.findAll);

  app.get("/api/cart/MaGH=:MaGH", cart.findOne);

  app.delete("/api/cart/MaGH=:MaGH", cart.delete);
 
};
