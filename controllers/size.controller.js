const Size = require("../models/size.model");

module.exports = {
  create: (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Dữ liệu không tồn tại",
      });
    }

    const size = new Size({
      ID: req.body.ID,
      KichThuocSP: req.body.KichThuocSP,
    });

    Size.create(size, (err, data) => {
      if (err) res.status(500).send({message: err.message || "some err"});
      else res.status(200).send(data);
    });
  },

  findOne: (req, res) => {
    Size.find(req.params.ID, (err, data) => {
      if (err) {
        res.status(404).send({
          message: `Not found id ${req.params.ID}.`,
        });
      } else {
        res.status(200).send(data);
      }
    });
  },

  findAll: (req, res) => {
    Size.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving size.",
        });
      else res.status(200).send(data);
    });
  },

  delete: (req, res) => {
    Size.delete(req.params.ID, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving size.",
        });
      else res.status(200).send({
        message: "Success!"
      });
    });
  },
};
