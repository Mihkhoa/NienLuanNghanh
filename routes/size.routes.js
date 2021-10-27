
module.exports = (app) => {
  const size = require("../controllers/size.controller");

  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post("/api/size/add", size.create);

  app.get("/api/sizes", size.findAll);

  app.get("/api/size/ID=:ID", size.findOne);

  app.delete("/api/size/ID=:ID", size.delete);
  
};
