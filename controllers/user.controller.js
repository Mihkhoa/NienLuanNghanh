const User = require("../models/user.model");
const userLogin = require("../middleware/verifyLogin");

module.exports = {
  create: (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Dữ liệu không tồn tại",
      });
    }
    // tạo đối tượng user
    const user = new User({
      username: req.body.username,
      password: req.body.password,
    });
    // controller kiểm tra dữ liệu đúng thì gửi tới model
    User.createUser(user, (err, data) => {
      if (err) res.status(500).send({ message: err.message || "some err" });
      // đăng ký thành công trả dữ liệu về client
      else res.status(200).send(data);
    });
  },

  findOne: (req, res) => {
    User.findUser(req.params.username, (err, data) => {
      if (err) {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.username}.`,
        });
      } else {
        res.status(200).send(data);
      }
    });
  },

  findAll: (req, res) => {
    User.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving customers.",
        });
      else res.status(200).send(data);
    });
  },

  update: (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }
    User.updateUser(req.params.username, new User(req.body), (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.username}.`,
          });
        } else {
          res.status(500).send({
            message: "Error updating Customer with id " + req.params.username,
          });
        }
      } else res.status(200).send(data);
    });
  },

  login: (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Conten can not be emty!!!",
      });
    }
    userLogin.userLogin(req.body.username, req.body.password, (err, data) => {
      if (err) {
        res.status(400).send({
          message: "Login error",
        });
      } else res.status(200).send(data);
    });
  },
};
