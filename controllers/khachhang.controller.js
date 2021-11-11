const Customer = require("../models/khachhang.model");

module.exports = {
  create: (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Dữ liệu không tồn tại",
      });
    }

    const customer = new Customer({
      MaKH: req.body.MaKH,
      TenKH: req.body.TenKH,
      SDT: req.body.SDT,
      Email: req.body.Email,
      DiaChi: req.body.DiaChi,
      Username: req.body.Username,
    });

    Customer.create( customer, (err, data) => {
      if (err) res.status(500).send({ message: err.message || "some err" });

      else res.status(200).send(data);
    });
  },

  findOne: (req, res) => {
    Customer.find(req.params.MaKH, (err, data) => {
      if (err) {
        res.status(404).send({
          message: `Not found.`,
        });
      } else {
        res.status(200).send(data);
      }
    });
  },

  findAll: (req, res) => {
    Customer.getAll(req.params.Username, (err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Some error",
        });
      else res.status(200).send(data);
    });
  },

  delete: (req, res) => {
    Customer.delete(req.params.MaKH, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving product.",
        });
      else res.status(200).send({
        message: "Success!"
      });
    });
  },
  
};
