const ExportInvoice = require("../models/hoadonxuat.model");

module.exports = {
  create: (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Dữ liệu không tồn tại",
      });
    }

    const exportInvoice = new ExportInvoice({
      NgayLapHDX: req.body.NgayLapHDX,
      TrangThaiHD: req.body.TrangThaiHD,
      MaKH: req.body.MaKH,
      MaKhoHang: req.body.MaKhoHang,
    });

    ExportInvoice.create(exportInvoice, (err, data) => {
      if (err) res.status(500).send({message: err.message || "some err"});
      else res.status(200).send(data);
    });
  },

  //   findOne: (req, res) => {
  //     ExportInvoice.find(req.params.MaHDX, (err, data) => {
  //       if (err) {
  //         res.status(404).send({
  //           message: `Not found Customer with id ${req.params.MaHDX}.`,
  //         });
  //       } else {
  //         res.status(200).send(data);
  //       }
  //     });
  //   },

  findAll: (req, res) => {
    ExportInvoice.getAll(req.params.MaKH, (err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Some error.",
        });
      else res.status(200).send(data);
    });
  },

  findMaHDX: (req, res) => {
    ExportInvoice.findMa((err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Some error.",
        });
      else res.status(200).send(data);
    });
  },

  innerJoinCustomer: (req, res) => {
    ExportInvoice.joinCustomer((err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving customers.",
        });
      else res.status(200).send(data);
    });
  },

  //   delete: (req, res) => {
  //     ExportInvoice.delete(req.params.MaHDX, (err, data) => {
  //       if (err)
  //         res.status(500).send({
  //           message:
  //             err.message || "Some error occurred while retrieving product.",
  //         });
  //       else
  //         res.status(200).send({
  //           message: "Success!",
  //         });
  //     });
  //   },
};
