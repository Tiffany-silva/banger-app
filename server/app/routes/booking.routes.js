const booking = require("../controllers/booking.controller");
const  auth  = require("../middleware");

var bookingRouter = require("express").Router();

bookingRouter.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

// Create a new booking
bookingRouter.post("/",[auth.authJwt.verifyToken], booking.create);
bookingRouter.get("/findAllForStatus",[auth.authJwt.verifyToken], booking.findAllForStatus);

bookingRouter.get("/findAllForStatusOfUser",[auth.authJwt.verifyToken], booking.findAllForStatusOfUser);

bookingRouter.post("/getAvailabilityOfVehicle", [auth.authJwt.verifyToken], booking.getAvailabilityOfVehicle);
bookingRouter.post("/getAvailableEquipments", [auth.authJwt.verifyToken], booking.getAvailableEquipments);
bookingRouter.get("/checkForBookingAvailability/", [auth.authJwt.verifyToken], booking.checkForBookingAvailability);
// Retrieve all booking
bookingRouter.get("/",[auth.authJwt.verifyToken, auth.authJwt.isClerk], booking.findAll);
bookingRouter.get("/findAllBookingsOfUser/:id", [auth.authJwt.verifyToken], booking.findAllBookingsOfUser);
bookingRouter.post("/getAvailableVehicles", [auth.authJwt.verifyToken], booking.getAvailableVehicles);
// Retrieve a single booking with id
bookingRouter.get("/:id",[auth.authJwt.verifyToken], booking.findOne);

bookingRouter.put("/completeBooking/:id",[auth.authJwt.verifyToken], booking.completeBooking);

bookingRouter.put("/updateBookingStatus/:id",[auth.authJwt.verifyToken], booking.updateBookingStatus);

bookingRouter.put("/extendReturnDate/:id",[auth.authJwt.verifyToken], booking.extendReturnDate);

// Delete a booking with id
bookingRouter.delete("/:id", [auth.authJwt.verifyToken, auth.authJwt.isClerk],booking.delete);

// Delete all booking
bookingRouter.delete("/",[auth.authJwt.verifyToken, auth.authJwt.isClerk], booking.deleteAll);


module.exports = bookingRouter;
