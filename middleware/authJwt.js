const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

const isLogin = (req, res, next) => {

  const tokenHeader = req.headers['x-access-token'];
  const token = tokenHeader.split(' ')[1];

  if(!token){
    return res.status(403).send({
      message: "No token provided!"
    })
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if(err){
      return res.status(401).send({
        message: "Unauthorized !"
      })
    }
    res.userId = decoded.id;
    next();
  })

};

module.exports = isLogin;