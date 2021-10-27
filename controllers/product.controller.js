const Product = require("../models/product.model");

module.exports = {
  create: (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Dữ liệu không tồn tại",
      });
    }

    const product = new Product({
      MaSP: req.body.MaSP,
      TenSP: req.body.TenSP,
      GiaSPX: req.body.GiaSPX,
      MaLSP: req.body.MaLSP,
      MaTH: req.body.MaTH,
      MaKT: req.body.MaKT,
      ThongTinSP: req.body.ThongTinSP,
    });

    Product.create(product, (err, data) => {
      if (err) res.status(500).send({message: err.message || "some err"});
      else res.status(200).send(data);
    });
  },

  findOne: (req, res) => {
    Product.find(req.params.MaSP, (err, data) => {
      if (err) {
        res.status(500).send({
          message: `Not found Customer with id ${req.params.MaSP}.`,
        });
      } else {
        res.status(200).send(data);
      }
    });
  },

  findAll: (req, res) => {
    Product.getAll((err, data) => {
      if (err) {
        res.status(500).send({message: err.message});
      } else res.status(200).send(data);
    });
  },

  sortByProduct: (req, res) => {
    Product.sortBy(req.params.SortBy, (err, data) => {
      if (err) {
        res.status(500).send({
          message: `Not found Customer with id ${req.params.SortBy}.`,
        });
      } else {
        res.status(200).send(data);
      }
    });
  },

  searchProduct: (req, res) => {
    Product.findProduct(req.params.TenSP, (err, data) => {
      if (err) {
        res.status(500).send({
          message: `Not found Customer with id ${req.params.TenSP}.`,
        });
      } else {
        res.status(200).send(data);
      }
    });
  },

  innerJoinImage: (req, res) => {
    Product.getAllImage((err, data) => {
      if (err) {
        res.status(500).send({message: err.message});
      } else res.status(200).send(data);
    });
  },

  innerJoinImInvoice: (req, res) => {
    Product.innerJoin((err, data) => {
      if (err) {
        res.status(500).send({message: err.message});
      } else {
        res.status(200).send(data);
      }
    });
  },

  fineOneInnerJoinImInvoice: (req, res) => {
    Product.fineOneJoinImInvoice(req.params.MaSP, (err, data) => {
      if (err) {
        res.status(500).send({message: err.message});
      } else {
        res.status(200).send(data);
      }
    });
  },

  delete: (req, res) => {
    Product.remove(req.params.MaSP, (err, data) => {
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
