const ChiTietHoaDonXuat = require("../models/chitiethoadonxuat.model");

module.exports = {
  create: (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Dữ liệu không tồn tại",
      });
    }

    const ChiTietHDX = new ChiTietHoaDonXuat({
      MaHDX: req.body.MaHDX,
      SoLuongXuat: req.body.SoLuongXuat,
      MaSP: req.body.MaSP,
    });

    ChiTietHoaDonXuat.create(ChiTietHDX, (err, data) => {
      if (err) res.status(500).send({message: err.message || "some err"});
      else res.status(200).send(data);
    });
  },

  findHD: (req, res) => {
    ChiTietHoaDonXuat.findHD(req.params.MaHDX, (err, data) => {
      if (err) {
        res.status(404).send({
          message: `Not found.`,
        });
      } else {
        res.status(200).send(data);
      }
    });
  },

  sumOrder: (req, res) => {
    ChiTietHoaDonXuat.getSumOrder(req.params.MaHDX, (err, data) => {
      if (err) {
        res.status(404).send({
          message: `Not found.`,
        });
      } else {
        res.status(200).send(data);
      }
    });
  },

  findMaSP: (req, res) => {
    ChiTietHoaDonXuat.getFindMaSP(req.params.MaSP, (err, data) => {
      if (err) {
        res.status(404).send({
          message: `Not found.`,
        });
      } else {
        res.status(200).send(data);
      }
    });
  },

  GroupByMaSP: (req, res) => {
    ChiTietHoaDonXuat.getGroupByMaSP((err, data) => {
      if (err) {
        res.status(404).send({
          message: `Not found.`,
        });
      } else {
        res.status(200).send(data);
      }
    });
  },

  //   findAll: (req, res) => {
  //     ExportInvoice.getAll((err, data) => {
  //       if (err)
  //         res.status(500).send({
  //           message:
  //             err.message || "Some error occurred while retrieving customers.",
  //         });
  //       else res.status(200).send(data);
  //     });

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
