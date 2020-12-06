    const hirer = require("../controllers/hirer.controller");
  
    var hirerRouter = require("express").Router();
  
    // Create a new hirer
    hirerRouter.post("/", hirer.create);

    hirerRouter.get("/findAllBlacklisted", hirer.findAllBlacklisted);

    hirerRouter.get("/findAllBookingsOfHirer", hirer.findAllBookingsOfHirer);
  
    // Retrieve all hirer
    hirerRouter.get("/", hirer.findAll);
    
    // Retrieve a single hirer with id
    hirerRouter.get("/:id", hirer.findOne);

    hirerRouter.put("/blackList/:id", hirer.blackList);

    hirerRouter.put("/confirmIdentity/:id", hirer.confirmIdentity);

    hirerRouter.put("/updatePhotoURL/:id", hirer.updatePhotoURL);

    hirerRouter.put("/updatePassword/:id", hirer.updatePassword);

    hirerRouter.put("/updateEmail/:id", hirer.updateEmail);

    hirerRouter.put("/updateAddress/:id", hirer.updateAddress);

    // Delete a hirer with id
    hirerRouter.delete("/:id", hirer.delete);
  
    // Delete all hirer
    hirerRouter.delete("/", hirer.deleteAll);
  
  module.exports=hirerRouter;