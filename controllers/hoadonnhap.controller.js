const ImportInvoice = require("../models/hoadonnhap.model");

module.exports = {
  create: (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Dữ liệu không tồn tại",
      });
    }

    const importinvoice = new ImportInvoice({
      NgayLapHDN: req.body.NgayLapHDN,
      SoLuongNhap: req.body.SoLuongNhap,
      GiaSPN: req.body.GiaSPN,
      MaKhoHang: req.body.MaKhoHang,
      MaSP: req.body.MaSP,
    });

    ImportInvoice.create(importinvoice, (err, data) => {
      if (err) res.status(500).send({message: err.message || "some err"});
      else res.status(200).send(data);
    });
  },

  findOneProduct: (req, res) => {
    ImportInvoice.findProduct(req.params.MaSP, (err, data) => {
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
    ImportInvoice.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving customers.",
        });
      else res.status(200).send(data);
    });
  },

  delete: (req, res) => {
    ImportInvoice.delete(req.params.MaHDN, (err, data) => {
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
