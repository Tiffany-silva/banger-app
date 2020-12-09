const jwt = require("jsonwebtoken");
const config = require("../configuration/auth.config");
const authController=require("../controllers/auth.controller");
const db = require("../db.Models");
const clerk = db.clerk;
const hirer=db.hirer;

verifyToken = async (req, res, next) => {
    let token = req.headers["x-access-token"];
    // let role=req.headers["role"];
    console.log(token)
  
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
      console.log(decoded.id);
      req.id = decoded.id;
      next();
    });
    // jwt.verify(token, config.secret, async (err, decoded) => {
    //   if(err){
    //     return err;
    //   }
    //   if(role==="clerk"){
    //     let done= await clerkdb.findOne({ where: { id: decoded.id , token: token}});
    //     console.log(done);
    //     return done;
    //   }else if(role==="hirer"){
    //     hirerdb.findOne({ where: { id: decoded , token: token}}, (err, hirer)=>{
    //       if(err){
    //          return cb(err);
    //       }
    //       cb(null, hirer);
    //     })
    //   }});
    // authController.findByToken(token, role).then(user=>{
    //   console.log(user.id);
    //   req.user=user.id;
    //   req.token=token;
    //   next();
    // });
      
    }
  
  


isClerk = (req, res, next) => {
  console.log(req.id);
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
