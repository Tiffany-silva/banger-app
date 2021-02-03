const db = require("../db.Models");
const config = require("../configuration/auth.config");
const hirerdb = db.hirer;
const clerkdb=db.clerk;
const roledb = db.role;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup=(req, res)=>{
  console.log(req.body);

  if(req.body.role==="clerk"){
    registerClerk(req, res);
  }else if(req.body.role==="hirer"){
    registerHirer(req,res);
  }
}

registerClerk = (req, res) => {
  // Save User to Database
  clerkdb.create({
    name:req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      if (req.body.role) {
        roledb.findOne({
          where: {
            name:  req.body.role
          }
        }).then(roles => {
          user.setRole(roles).then(() => {
              res.status(200).json({success:  true, user: user});
          });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

registerHirer = (req, res) => {

    let hirerUser = {
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        nic: req.body.nic,
        photoURL:req.body.photoURL,
        confirmIdentity:req.body.confirmIdentity ? req.body.confirmIdentity : false ,
        drivingLicenseUrl:req.body.drivingLicenseUrl ? req.body.drivingLicenseUrl : null,
        proofURL: req.body.drivingLicenseUrl ? req.body.drivingLicenseUrl : null,
        address:req.body.address,
        dob:req.body.dob,
        blackListed: false,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password, 8)
      }

    // Save User to Database
    hirerdb.create(hirerUser)
      .then(user => {
        if (req.body.role) {
          roledb.findOne({
            where: {
              name:  req.body.role
            }
          }).then(roles => {
            user.setRole(roles).then(() => {
                res.status(200).json({success:  true, user: user});
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

        let hirer=await hirerdb.findOne({where: {email: req.body.email}, include: [roledb]});
        let clerk=await clerkdb.findOne({where: {email: req.body.email},include: [roledb]});
        let response;
        if(hirer){
            response=await validateSignIn(req, res, hirer);
            res.status(200).send(response);
        }else{
            if(clerk){
                response=await validateSignIn(req, res, clerk);
                res.status(200).send(response);
            }else{
                return res.status(404).send({ message: "User Not found." });
            }
        }
    }catch(error){
        res.status(500).send({ message: error.message });
    }
}

validateSignIn=async (req, res, user)=>{
    let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

    if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
    }
    if(user.token){
      res.status(400).send({  error: true, message: "already logged in"});
    }else{
      let role=user.role.name;
      let token= await this.generateToken(user, role);

      let response={
          id: user.id,
          email: user.email,
          role: role,
          accessToken: token
        };
        return  response;
    }
    // let token = jwt.sign({ id: clerk.id }, config.secret, {
    //     expiresIn: 86400 // 24 hours
    // });

    }


exports.generateToken=async (user,role)=>{

  let token = jwt.sign({ id: user.id }, config.secret);
  if(role==="clerk"){
    let done=await clerkdb.update({token: token}, {where: {id: user.id}});
    if(done) return token;
  }else if(role==="hirer"){
    let done=await hirerdb.update({token: token}, {where: {id: user.id}});
    if(done) return token;
    }
  }


exports.findByToken= async (token,role)=>{
  jwt.verify(token, config.secret, async (err, decoded) => {
    if(err){
      return err;
    }
    if(role==="clerk"){
      let done= await clerkdb.findOne({ where: { id: decoded.id , token: token}});
      return done;
    }else if(role==="hirer"){
      hirerdb.findOne({ where: { id: decoded , token: token}}, (err, hirer)=>{
        if(err){
           return cb(err);
        }
        cb(null, hirer);
      })
    }});
  }

exports.deleteToken=(req, res)=>{
  console.log(req.body.role);
  if(req.body.role ==="clerk"){
    clerkdb.update({token: null}, {where: {id: req.params.id}}).then(data=>{
      res.status(200).send(data);
    }).catch(err=>{
      res.status(500).send({ message: err.message });
    })
  }else if(req.body.role==="hirer"){
    hirerdb.update({token: null}, {where: {id: req.params.id}}).then(data=>{
      res.status(200).send(data);
    }).catch(err=>{
      res.status(500).send({ message: err.message });
    })
  }
}
