
    const clerks = require("../controllers/clerk.controller");
  
    var routerClerk = require("express").Router();
  
    // Create a new clerk
    routerClerk.post("/", clerks.create);
  
    // Retrieve all clerks
    routerClerk.get("/", clerks.findAll);
  
    // Retrieve a single clerk with id
    routerClerk.get("/:id", clerks.findOne);
  
    // Update a clerk with id
    // router.put("/:id", clerks.update);
  
    // Delete a clerk with id
    routerClerk.delete("/:id", clerks.delete);
  
    routerClerk.put("/updateEmail/:id", clerks.updateEmail);

    routerClerk.put("/updatePassword/:id", clerks.updatePassword);

    routerClerk.put("/updateName/:id", clerks.updateName);

    module.exports=routerClerk;