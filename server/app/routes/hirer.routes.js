    const hirer = require("../controllers/hirer.controller");
    const  authJwt  = require("../middleware").authJwt;

    var hirerRouter = require("express").Router();
  
    hirerRouter.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
    // Create a new hirer
    hirerRouter.post("/", hirer.create);

    hirerRouter.get("/findAllBlacklisted",[authJwt.verifyToken, authJwt.isClerk], hirer.findAllBlacklisted);

    hirerRouter.get("/findAllBookingsOfHirer",[authJwt.verifyToken], hirer.findAllBookingsOfHirer);
    hirerRouter.get("/isBlacklisted/:id",[authJwt.verifyToken], hirer.isBlacklisted);
    // Retrieve all hirer
    hirerRouter.get("/",[authJwt.verifyToken], hirer.findAll);
    
    // Retrieve a single hirer with id
    hirerRouter.get("/:id",[authJwt.verifyToken], hirer.findOne);

    hirerRouter.put("/blackList/:id", [authJwt.verifyToken],hirer.blackList);

    hirerRouter.put("/confirmIdentity/:id",[authJwt.verifyToken], hirer.confirmIdentity);

    hirerRouter.put("/updatePhotoURL/:id",[authJwt.verifyToken], hirer.updatePhotoURL);

    hirerRouter.put("/updatePassword/:id",[authJwt.verifyToken], hirer.updatePassword);

    hirerRouter.put("/updateEmail/:id", [authJwt.verifyToken],hirer.updateEmail);

    hirerRouter.put("/updateAddress/:id",[authJwt.verifyToken], hirer.updateAddress);

    // Delete a hirer with id
    hirerRouter.delete("/:id",[authJwt.verifyToken], hirer.delete);
  
    // Delete all hirer
    hirerRouter.delete("/",[authJwt.verifyToken, authJwt.isClerk], hirer.deleteAll);
  
  module.exports=hirerRouter;