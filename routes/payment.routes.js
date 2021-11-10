module.exports = (app) => {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post("/create_payment_url", function (req, res, next) {
    var ipAddr = req.headers["x-forwarded-for"] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;

    var config = require("config");

    var tmnCode = config.get("vnp_TmnCode");
    var secretKey = config.get("vnp_HashSecret");
    var vnpUrl = config.get("vnp_Url");
    var returnUrl = config.get("vnp_ReturnUrl");

    const today = new Date();

    const yyyy = today.getFullYear();
    const dd = today.getDate() < 10 ? "0" + today.getDate() : today.getDate();
    const mm = today.getMonth() + 1 < 10 ? "0" + (today.getMonth() + 1) : today.getMonth() + 1;

    const HH = today.getHours() < 10 ? "0" + today.getHours() : today.getHours();
    const ss = today.getSeconds() < 10 ? "0" + today.getSeconds() : today.getSeconds();
    const MM = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();

    var createDate = yyyy + "" + mm + "" + dd + "" + HH + "" + MM + "" + ss;
    var orderId = HH + "" + MM + "" + ss;
    var amount = req.body.amount;
    var bankCode = req.body.bankCode;
    
    var orderInfo = "hanh toan hoa don ngay"+dd+"thang"+mm+"nam"+yyyy+"-"+HH+"gio"+MM+"phut"+ss+"giay";
    var orderType = req.body.orderType;
    var locale = req.body.language;
    if (locale === null || locale === "") {
      locale = "vn";
    }
    var currCode = "VND";
    var vnp_Params = {};
    vnp_Params["vnp_Version"] = "2.1.0";
    vnp_Params["vnp_Command"] = "pay";
    vnp_Params["vnp_TmnCode"] = tmnCode;
    vnp_Params["vnp_Locale"] = locale;
    vnp_Params["vnp_CurrCode"] = currCode;
    vnp_Params["vnp_TxnRef"] = orderId;
    vnp_Params["vnp_OrderInfo"] = orderInfo;
    vnp_Params["vnp_OrderType"] = orderType;
    vnp_Params["vnp_Amount"] = amount * 100;
    vnp_Params["vnp_ReturnUrl"] = returnUrl;
    vnp_Params["vnp_IpAddr"] = ipAddr;
    vnp_Params["vnp_CreateDate"] = createDate;
    if (bankCode !== null && bankCode !== "") {
      vnp_Params["vnp_BankCode"] = bankCode;
    }

    vnp_Params = sortObject(vnp_Params);

    var querystring = require("qs");
    var signData = querystring.stringify(vnp_Params, {encode: false});
    var crypto = require("crypto");
    var hmac = crypto.createHmac("sha512", secretKey);
    var signed = hmac.update(new Buffer.from(signData, "utf-8")).digest("hex");
    vnp_Params["vnp_SecureHash"] = signed;
    vnpUrl += "?" + querystring.stringify(vnp_Params, {encode: false});

    res.status(200).send(vnpUrl);
  });

  app.get("/vnpay_return", function (req, res, next) {
    var vnp_Params = req.query;

    var secureHash = vnp_Params["vnp_SecureHash"];

    delete vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHashType"];

    vnp_Params = sortObject(vnp_Params);

    var config = require("config");
    var tmnCode = config.get("vnp_TmnCode");
    var secretKey = config.get("vnp_HashSecret");

    var querystring = require("qs");
    var signData = querystring.stringify(vnp_Params, {encode: false});
    var crypto = require("crypto");
    var hmac = crypto.createHmac("sha512", secretKey);
    var signed = hmac.update(new Buffer.from(signData, "utf-8")).digest("hex");

    if (secureHash === signed) {
      //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua

      res.status(200).send({code: vnp_Params["vnp_ResponseCode"]});
    } else {
      res.status(200).send({code: "97"});
    }
  });

  app.get("/vnpay_ipn", function (req, res, next) {
    const sql = require("../models/db");
    var vnp_Params = req.query;
    var secureHash = vnp_Params["vnp_SecureHash"];

    delete vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHashType"];

    vnp_Params = sortObject(vnp_Params);
    var config = require("config");
    var secretKey = config.get("vnp_HashSecret");
    var querystring = require("qs");
    var signData = querystring.stringify(vnp_Params, {encode: false});
    var crypto = require("crypto");
    var hmac = crypto.createHmac("sha512", secretKey);
    var signed = hmac.update(new Buffer.from(signData, "utf-8")).digest("hex");

    if (secureHash === signed) {
      var orderId = vnp_Params["vnp_TxnRef"];
      var rspCode = vnp_Params["vnp_ResponseCode"];
      //Kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi
      res.status(200).json({RspCode: "00", Message: "success"});
    } else {
      res.status(200).json({RspCode: "97", Message: "Fail checksum"});
    }
  });

  const sortObject = (obj) => {
    var sorted = {};
    var str = [];
    var key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        str.push(encodeURIComponent(key));
      }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
      sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
  };
};
