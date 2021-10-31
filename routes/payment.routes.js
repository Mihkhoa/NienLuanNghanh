module.exports = (app) => {

  const payment_vnpay = require("../controllers/payment.controller.js");

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post('/create_payment_url', payment_vnpay.payment);
}