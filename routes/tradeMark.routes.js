
module.exports = (app) => {
  const trademark = require("../controllers/tradeMark.controller");

  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post("/api/trademark/add", trademark.create);

  app.get("/api/trademarks", trademark.findAll);

  app.get("/api/trademark/MaTH=:MaTH", trademark.findOne);

  app.delete("/api/trademark/MaTH=:MaTH", trademark.delete);
 
};
