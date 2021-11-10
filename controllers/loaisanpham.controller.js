const ProductType = require("../models/loaisanpham.model");

module.exports = {
  create: (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Dữ liệu không tồn tại",
      });
    }

    const producttype = new ProductType({
      MaLSP: req.body.MaLSP,
      TenLSP: req.body.TenLSP,
    });

    ProductType.create(producttype, (err, data) => {
      if (err) res.status(500).send({message: err.message || "some err"});
      else res.status(200).send(data);
    });
  },

  findOne: (req, res) => {
    ProductType.find(req.params.MaLSP, (err, data) => {
      if (err) {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.MaLSP}.`,
        });
      } else {
        res.status(200).send(data);
      }
    });
  },

  WareHouse: (req, res) => {
    ProductType.innerJoinWareHouse(req.params.MaLSP, (err, data) => {
      if (err) {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.MaLSP}.`,
        });
      } else {
        res.status(200).send(data);
      }
    });
  },

  findAll: (req, res) => {
    ProductType.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving customers.",
        });
      else res.status(200).send(data);
    });
  },

  delete: (req, res) => {
    ProductType.delete(req.params.MaLSP, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving product.",
        });
      else
        res.status(200).send({
          message: "Success!",
        });
    });
  },
};
