
    const vehicle = require("../controllers/vehicle.controller");
    const  authJwt  = require("../middleware").authJwt;

    var vehicleRouter = require("express").Router();
  
    vehicleRouter.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    
    // Create a new vehicle
    vehicleRouter.post("/",[authJwt.verifyToken, authJwt.isClerk], vehicle.create);

    vehicleRouter.get("/findAllBookingsofVehicle/:id", [authJwt.verifyToken],vehicle.findAllBookingsofVehicle);
  
    // Retrieve all vehicle
    vehicleRouter.get("/",[authJwt.verifyToken], vehicle.findAll);
    vehicleRouter.get("/:id", [authJwt.verifyToken], vehicle.findOne);

    vehicleRouter.put("/updateQuantity/:id", [authJwt.verifyToken, authJwt.isClerk],vehicle.updateQuantity);

    vehicleRouter.put("/updatePrice/:id",[authJwt.verifyToken, authJwt.isClerk], vehicle.updatePrice);

    // Delete a vehicle with id
    vehicleRouter.delete("/:id",[authJwt.verifyToken, authJwt.isClerk], vehicle.delete);
  
    // Delete all vehicle
    vehicleRouter.delete("/",[authJwt.verifyToken, authJwt.isClerk], vehicle.deleteAll);
  
    module.exports = vehicleRouter;