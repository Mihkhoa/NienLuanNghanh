const ExportInvoice = require("../models/hoadonxuat.model");

module.exports = {
  create: (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Dữ liệu không tồn tại",
      });
    }

    const exportInvoice = new ExportInvoice({
      TrangThaiHD: req.body.TrangThaiHD,
      NgayLapHDX: req.body.NgayLapHDX,
      TinhTrangHD: req.body.TinhTrangHD,
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

  findMaKH: (req, res) => {
    ExportInvoice.getMaKH(req.params.MaKH, (err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Some error.",
        });
      else res.status(200).send(data);
    });
  },

  findDataChart: (req, res) => {
    ExportInvoice.getDataChart(req.params.date, req.params.todate, (err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Some error.",
        });
      else res.status(200).send(data);
    });
  },

  findAll: (req, res) => {
    ExportInvoice.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Some error.",
        });
      else res.status(200).send(data);
    });
  },

  sumGiaSPX: (req, res) => {
    ExportInvoice.getSumGiaSPX((err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Some error.",
        });
      else res.status(200).send(data);
    });
  },

  findMaHDX: (req, res) => {
    ExportInvoice.getMaHDX((err, data) => {
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
  updateTTHD: (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }
    ExportInvoice.upTrangThaiHD(new ExportInvoice(req.body), req.params.MaHDX, (err, data) => {
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
