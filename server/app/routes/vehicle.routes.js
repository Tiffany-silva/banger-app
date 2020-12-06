
    const vehicle = require("../controllers/vehicle.controller");
  
    var vehicleRouter = require("express").Router();
  
    // Create a new vehicle
    vehicleRouter.post("/", vehicle.create);

    vehicleRouter.get("/findAllBookingsofVehicle", vehicle.findAllBookingsofVehicle);
  
    // Retrieve all vehicle
    vehicleRouter.get("/", vehicle.findAll);

    vehicleRouter.put("/updateQuantity/:id", vehicle.updateQuantity);

    vehicleRouter.put("/updatePrice/:id", vehicle.updatePrice);

    // Delete a vehicle with id
    vehicleRouter.delete("/:id", vehicle.delete);
  
    // Delete all vehicle
    vehicleRouter.delete("/", vehicle.deleteAll);
  
    module.exports = vehicleRouter;