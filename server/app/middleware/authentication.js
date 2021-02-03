const jwt = require("jsonwebtoken");
const config = require("../configuration/auth.config");
const db = require("../db.Models");
const clerk = db.clerk;
const hirer=db.hirer;

verifyToken = async (req, res, next) => {
    let token = req.headers["x-access-token"];
    // let role=req.headers["role"];

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
      req.id = decoded.id;
      next();
    });
    }

isClerk = (req, res, next) => {
    clerk.findByPk(req.id).then(user => {
        if(user===null){
            res.status(403).send({
                message: "Not a registered Clerk"
              });
        }else{
          next();
            return;
        }
    });
  };
  isHirer = (req, res, next) => {
    hirer.findByPk(req.userId).then(user => {
        if(user===null){
            res.status(403).send({
                message: "Not a registered hirer"
              });
        }else{
           next();
            return;
        }
    });
  };

  const authJwt = {
    verifyToken: verifyToken,
    isClerk: isClerk,
    isHirer: isHirer,
  };
  module.exports = authJwt;
