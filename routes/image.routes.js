const multer = require("multer");

const fileStore = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./views/public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: fileStore });

module.exports = (app) => {
  const image = require("../controllers/image.controller");

  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post("/api/image/add", upload.single("file") , image.create);

  app.get("/api/images", image.findAll);

  app.get("/api/image/MaSP=:MaSP", image.findOne);

  app.delete("/api/image/MaSP=:MaSP", image.delete);
 
};
