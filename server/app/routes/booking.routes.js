const booking = require("../controllers/booking.controller");

var bookingRouter = require("express").Router();

// Create a new booking
bookingRouter.post("/", booking.create);

bookingRouter.get("/findAllForStatus", booking.findAllForStatus);

// Retrieve all booking
bookingRouter.get("/", booking.findAll);

// Retrieve a single booking with id
bookingRouter.get("/:id", booking.findOne);

bookingRouter.put("/completeBooking/:id", booking.completeBooking);

bookingRouter.put("/updateBookingStatus/:id", booking.updateBookingStatus);

bookingRouter.put("/extendReturnDate/:id", booking.extendReturnDate);

// Delete a booking with id
bookingRouter.delete("/:id", booking.delete);

// Delete all booking
bookingRouter.delete("/", booking.deleteAll);

module.exports = bookingRouter;
