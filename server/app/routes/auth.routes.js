const middleware= require("../middleware");
const controller = require("../controllers/auth.controller");
const routerAuth=require("express").Router();

    routerAuth.use(function(req, res, next) {
      
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });

    routerAuth.post("/signup",
    [
        middleware.verifyRegistration.checkDuplicateEmail,
        middleware.verifyRegistration.checkRolesExisted
    ],
        controller.signup
  );

    routerAuth.post("/login", controller.signin);

    routerAuth.post("/logout/:id", controller.deleteToken);
    
module.exports=routerAuth;