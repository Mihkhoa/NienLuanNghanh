
module.exports = (app) => {
  const customer = require("../controllers/customer.controller");

  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post("/api/customer/add", customer.create);

  app.get("/api/customers", customer.findAll);

  app.get("/api/customer/MaKH=:MaKH", customer.findOne);

  app.delete("/api/customer/MaKH=:MaKH", customer.delete);
 
};
