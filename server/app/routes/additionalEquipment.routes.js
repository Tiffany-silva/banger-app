
    const additionalEquipment = require("../controllers/aEquipment.controller");
  
    var aEquipmentRouter = require("express").Router();
  
    // Create a new additionalEquipment
    aEquipmentRouter.post("/", additionalEquipment.create);

    aEquipmentRouter.get("/findAllAvailable", additionalEquipment.findAllAvailable);
  
    // Retrieve all additionalEquipment
    aEquipmentRouter.get("/", additionalEquipment.findAll);
    
    // Retrieve a single additional Equipment with id
    aEquipmentRouter.get("/:id", additionalEquipment.findOne);

    aEquipmentRouter.put("/updateQuantity/:id", additionalEquipment.updateQuantity);

    // Delete a hirer with id
    aEquipmentRouter.delete("/:id", additionalEquipment.delete);
  
    // Delete all hirer
    aEquipmentRouter.delete("/", additionalEquipment.deleteAll);
  
module.exports=aEquipmentRouter;