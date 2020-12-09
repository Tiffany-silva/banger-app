
    const additionalEquipment = require("../controllers/aEquipment.controller");
    const  auth  = require("../middleware");

    var aEquipmentRouter = require("express").Router();
    aEquipmentRouter.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });
    
    // Create a new additionalEquipment
    aEquipmentRouter.post("/",[auth.authJwt.verifyToken, auth.authJwt.isClerk], additionalEquipment.create);

    aEquipmentRouter.get("/findAllAvailable",[auth.authJwt.verifyToken], additionalEquipment.findAllAvailable);
  
    // Retrieve all additionalEquipment
    aEquipmentRouter.get("/", [auth.authJwt.verifyToken],additionalEquipment.findAll);
    
    // Retrieve a single additional Equipment with id
    aEquipmentRouter.get("/:id", [auth.authJwt.verifyToken],additionalEquipment.findOne);

    aEquipmentRouter.put("/updateQuantity/:id",[auth.authJwt.verifyToken, auth.authJwt.isClerk], additionalEquipment.updateQuantity);

    // Delete a hirer with id
    aEquipmentRouter.delete("/:id", [auth.authJwt.verifyToken, auth.authJwt.isClerk],additionalEquipment.delete);
  
    // Delete all hirer
    aEquipmentRouter.delete("/", [auth.authJwt.verifyToken, auth.authJwt.isClerk],additionalEquipment.deleteAll);
  
module.exports=aEquipmentRouter;