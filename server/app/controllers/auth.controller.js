const db = require("../db.Models");
const config = require("../configuration/auth.config");
const hirer = db.hirer;
const clerk=db.clerk;
const role = db.role;

const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.registerClerk = (req, res) => {
  // Save User to Database
  clerk.create({
    name:req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      if (req.body.roles) {
        role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User was registered successfully!" });
          });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.registerHirer = (req, res) => {

    let hirerUser = {
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        photoURL:req.body.photoURL, 
        confirmIdentity:req.body.confirmIdentity ? req.body.confirmIdentity : false ,
        drivingLicenseUrl:req.body.drivingLicenseUrl ? req.body.drivingLicenseUrl : null,
        address:req.body.address,
        dob:req.body.dob,
        blackListed: false, 
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password, 8)
      }
      
    // Save User to Database
    hirer.create(hirerUser)
      .then(user => {
        if (req.body.roles) {
          role.findAll({
            where: {
              name: {
                [Op.or]: req.body.roles
              }
            }
          }).then(roles => {
            user.setRoles(roles).then(() => {
              res.send({ message: "User was registered successfully!" });
            });
          });
        }
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

exports.signin = async (req, res) => {
    try{
        let hirer=await hirer.findOne({where: {email: req.body.email}});
        let clerk=await clerk.findOne({where: {email: req.body.email}});
        let response;
        if(hirer){
            response=signinHirer(req, res, hirer);
            res.status(200).send(response);
        }else{
            if(clerk){
                response=signInClerk(req, res, clerk);
                res.status(200).send(response);
            }else{
                return res.status(404).send({ message: "User Not found." });
            }   
        }
    }catch(error){
        res.status(500).send({ message: error.message });
    }
  
      
}

signinHirer=(req,res, hirer)=>{
    let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        hirer.password
      );

    if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
    } 

    let token = jwt.sign({ id: hirer.id }, config.secret, {
        expiresIn: 86400 // 24 hours
    });

    let authority;
    hirer.getRoles().then(roles => {
        authority="ROLE_" +roles.name.toUpperCase();
        return {
          id: hirer.id,
          email: hirer.email,
          roles: authority,
          accessToken: token
        };
    });  
}

signInClerk=(req, res, clerk)=>{
    let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        clerk.password
      );

    if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
    } 

    let token = jwt.sign({ id: clerk.id }, config.secret, {
        expiresIn: 86400 // 24 hours
    });

    let authorities = [];
    clerk.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        authorities.push("ROLE_" + roles[i].name.toUpperCase());
      }
      return {
        id: clerk.id,
        email: user.email,
        roles: authorities,
        accessToken: token
      };
    });
}