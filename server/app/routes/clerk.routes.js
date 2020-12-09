const  authJwt  = require("../middleware").authJwt;
const clerks = require("../controllers/clerk.controller");
var routerClerk = require("express").Router();

routerClerk.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

// Create a new clerk
// routerClerk.post("/", [authJwt.verifyToken, authJwt.isClerk], clerks.create);

// Retrieve all clerks
routerClerk.get("/", [authJwt.verifyToken, authJwt.isClerk], clerks.findAll);

// Retrieve a single clerk with id
routerClerk.get("/:id", [authJwt.verifyToken, authJwt.isClerk], clerks.findOne);

// Update a clerk with id
// router.put("/:id", clerks.update);

// Delete a clerk with id
routerClerk.delete(
  "/:id",
  [authJwt.verifyToken, authJwt.isClerk],
  clerks.delete
);

routerClerk.put(
  "/updateEmail/:id",
  [authJwt.verifyToken, authJwt.isClerk],
  clerks.updateEmail
);

routerClerk.put(
  "/updatePassword/:id",
  [authJwt.verifyToken, authJwt.isClerk],
  clerks.updatePassword
);

routerClerk.put(
  "/updateName/:id",
  [authJwt.verifyToken, authJwt.isClerk],
  clerks.updateName
);

module.exports = routerClerk;
