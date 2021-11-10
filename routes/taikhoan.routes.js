const verifyLogin = require("../middleware/authJwt");

// client gửi yêu cầu tới user.routes
module.exports = (app) => {
  const user = require("../controllers/taikhoan.controller");

  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });
// prefix api/model

  // tạo người dùng mới
  app.post("/api/user/signup", user.create);

  // truy cập người dùng
  app.post("/api/user/signin", user.login);

  // lấy tất cả danh sách người dùng
  app.get("/api/user", user.findAll);

  // lấy một người dùng với username
  app.get("/api/user/:username", user.findOne);

  // cập nhật người dùng với username
  app.put("/api/user/username", user.update);

  // // xóa một người dùng với username
  // app.delete("/customers/:customerId", customers.delete);

  // // xóa tất cả người dùng
  // app.delete("/customers", customers.deleteAll);
 
};
