const TradeMark = require("../models/thuonghieu.model");

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
          message: 'Not found.',
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
            err.message || "Some error.",
        });
      else res.status(200).send(data);
    });
  },

  delete: (req, res) => {
    TradeMark.delete(req.params.MaTH, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error.",
        });
      else res.status(200).send({
        message: "Success!"
      });
    });
  },
};
