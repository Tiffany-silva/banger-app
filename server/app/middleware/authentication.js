const jwt = require("jsonwebtoken");
const config = require("../configuration/auth.config");
const db = require("../db.Models");
const clerk = db.clerk;
const hirer=db.hirer;

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
  
    if (!token) {
      return res.status(403).send({
        message: "Empty Token!"
      });
    }
  
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!"
        });
      }
      req.userId = decoded.id;
      next();
    });
  };


isClerk = (req, res, next) => {
    clerk.findByPk(req.userId).then(user => {
        if(user===null){
            res.status(403).send({
                message: "Not a registered Clerk"
              });
        }else{
            return "Clerk";
        }
    });
  };
  isHirer = (req, res, next) => {
    clerk.findByPk(req.userId).then(user => {
        if(user===null){
            res.status(403).send({
                message: "Not a registered Clerk"
              });
        }else{
            return "Hirer";
        }
    });
  };

  const authJwt = {
    verifyToken: verifyToken,
    isClerk: isClerk,
    isHirer: isHirer,
    isModeratorOrAdmin: isModeratorOrAdmin
  };
  module.exports = authJwt;
