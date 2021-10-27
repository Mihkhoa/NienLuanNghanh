const TradeMark = require("../models/tradeMark.model");

module.exports = {
  create: (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Dữ liệu không tồn tại",
      });
    }

    const trademark = new TradeMark({
      MaTH: req.body.MaTH,
      TenTH: req.body.TenTH,
    });

    TradeMark.create(trademark, (err, data) => {
      if (err) res.status(500).send({message: err.message || "some err"});
      else res.status(200).send(data);
    });
  },

  findOne: (req, res) => {
    TradeMark.find(req.params.MaTH, (err, data) => {
      if (err) {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.MaTH}.`,
        });
      } else {
        res.status(200).send(data);
      }
    });
  },

  findAll: (req, res) => {
    TradeMark.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving customers.",
        });
      else res.status(200).send(data);
    });
  },

  delete: (req, res) => {
    TradeMark.delete(req.params.MaTH, (err, data) => {
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
