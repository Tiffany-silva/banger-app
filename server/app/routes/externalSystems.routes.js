const external = require("../controllers/externalSystems/externalSystems.controller");
const  auth  = require("../middleware");
const externalRouter = require("express").Router();
externalRouter.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

// Create a new booking
externalRouter.post("/isUserInDMVList",[auth.authJwt.verifyToken], external.isUserInDMVList);
externalRouter.post("/checkForFraudClaims",[auth.authJwt.verifyToken], external.checkForFraudClaims);
externalRouter.get("/rateComparison",[auth.authJwt.verifyToken], external.checkForFraudClaims);

module.exports = externalRouter;
