const Cart = require("../models/cart.model");

module.exports = {
  create: (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Dữ liệu không tồn tại",
      });
    }

    const cart = new Cart({
      Username: req.body.Username,
      MaSP: req.body.MaSP,
      SLSP: req.body.SLSP,
    });

    Cart.create(cart, (err, data) => {
      if (err) res.status(500).send({message: err.message || "some err"});
      else res.status(200).send(data);
    });
  },

  findOne: (req, res) => {
    Cart.find(req.params.MaSP, req.params.Username, (err, data) => {
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
    Cart.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving customers.",
        });
      else res.status(200).send(data);
    });
  },

  sumProduct: (req, res) => {
    Cart.Sum(req.params.Username, (err, data) => {
      if (err)
        res.status(404).send({
          message: `Not found.`,
        });
      else res.status(200).send(data);
    });
  },

  delete: (req, res) => {
    Cart.delete(req.params.MaSP, req.params.Username, (err, data) => {
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

  update: (req, res) => {
    if (!req.body) {
      console.log("KHONG CO DATA");
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }
    Cart.updateSoLuongSP(new Cart(req.body), (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found.`,
          });
        } else {
          res.status(500).send({
            message: "Error updating",
          });
        }
      } else res.send(data);
    });
  },
};
