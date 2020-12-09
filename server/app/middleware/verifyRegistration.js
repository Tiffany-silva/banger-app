const db=require("../db.Models");
const ROLES = db.ROLES;
const clerk = db.clerk;
const hirer=db.hirer;


checkDuplicateEmail = (req, res, next)=>{
  if(req.body.role==="clerk"){
    checkDuplicateEmailClerk(req,res,next);
  }else if(req.body.role==="hirer"){
    checkDuplicateEmailHirer(req,res,next);
  }
}

checkDuplicateEmailHirer = (req, res, next) => {
      // Email
      hirer.findOne({
        where: {
          email: req.body.email
        }
      }).then(user => {
        if (user) {
          res.status(400).send({
            message: "Failed! Email is already in use!"
          });
          return;
        }
        next();
      });
  };
  
  checkDuplicateEmailClerk = (req, res, next) => {
    // Email
    console.log(req.body);
    clerk.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Failed! clerk email is already in use!"
        });
        return;
      }
      next();
    });
};

checkRolesExisted = (req, res, next) => {
    if (req.body.role && !ROLES.includes(req.body.role)) {
          res.status(400).send({
            message: "Failed! Role does not exist = " + req.body.role
          });
          return;
    } 
    next();
  };

  const verifyRegistration = {
    checkDuplicateEmail: checkDuplicateEmail,
    checkRolesExisted: checkRolesExisted
  };
  
  module.exports = verifyRegistration;
