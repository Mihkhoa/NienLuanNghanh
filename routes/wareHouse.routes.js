
module.exports = (app) => {
  const wareHouse = require("../controllers/wareHouse.controller");

  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post("/api/wareHouse/add", wareHouse.create);

  app.get("/api/wareHouses", wareHouse.findAll);

  app.get("/api/wareHouse/MaKhoHang=:MaKhoHang", wareHouse.findOne);

  app.delete("/api/wareHouse/MaKhoHang=:MaKhoHang", wareHouse.delete);
 
};
