const Cart = require("../models/cart.model");

module.exports = {
  create: (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Dữ liệu không tồn tại",
      });
    }

    const cart = new Cart({
      MaGH: req.body.MaGH,
      Username: req.body.Username,
    });

    Cart.create(cart, (err, data) => {
      if (err) res.status(500).send({message: err.message || "some err"});
      else res.status(200).send(data);
    });
  },

  findOne: (req, res) => {
    Cart.find(req.params.MaGH, (err, data) => {
      if (err) {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.MaGH}.`,
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

  delete: (req, res) => {
    Cart.delete(req.params.MaGH, (err, data) => {
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
