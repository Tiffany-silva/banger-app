/**
 * booking.controller.js
 * @author: Supeshala Silva
 * @date: 23-11-2020
 * @description: This represents the controller for the booking component
 *               Includes all the server side controller functions
 */


const db = require("../db.Models");
const differenceInCalendarDays = require('date-fns/differenceInCalendarDays')
const parseISO = require('date-fns/parseISO');
const booking = db.booking;
const additionalEquipment = db.additionalEquipment;
const vehicle = db.vehicle;
const hirer = db.hirer;

/**
 *@description {creates and save the submitted booking}
 * @param {request consists of the submitted booking details} req 
 * @param {response of the booking} res 
 */
 exports.create =  async ( req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Booking
  let bookingVehicle = {
    hirerId: req.body.hirerId,
    bookingStatus: req.body.bookingStatus,
    bookingDate: req.body.bookingDate,
    returnDate: req.body.returnDate,
    totalPrice: calculatePrice(req.body.bookingDate,req.body.returnDate, req.body.vehicleCost),
    vehicleId: req.body.vehicleId,
  };

	try{
		const result =  await db.sequelize.transaction(async (t) => {

			//Reserve additional Equipments if booked
			if (req.body.additionalEquipmentId) {
				req.body.additionalEquipmentId.map((aequipment) => {
					additionalEquipment
						.decrement("quantity", { by: 1, where: { id: aequipment },transaction: t});
				});
			};
			
			//Reserve vehicle
			await vehicle.decrement("quantity", { by: 1, where: { id: req.body.vehicleId }, transaction:t});
			

			//Save the booking
			let book= await booking.create(bookingVehicle, {transaction: t});
			
			//save the additional equipments and booking
			if (req.body.additionalEquipmentId) {
				await book.addAdditionalEquipments(req.body.additionalEquipmentId, {transaction: t});
			}
		});

		res.send(result);
	}catch(error){
		res.status(500).send({
			message:
			error.message && "Some error occurred while creating the Booking.",
		});
	}
};

/**
 * Clerk View
 *@description {Retrieve all Bookings}
 * @param {requesting for all booking} req 
 * @param {response consisting of bookings} res 
 */
exports.findAll = (req, res) => {
  booking.findAll().then((bookings) => res.json(bookings));
};

/**
 *@description {Find a single Booking with an id and return all details}
 * @param {requesting for the booking provided the id} req 
 * @param {response consisting of bookings} res 
 */
exports.findOne = (req, res) => {
  console.log(req);
  const id = req.params.id;

  booking
    .findOne({
      where: { id: id },
      include: [additionalEquipment, vehicle, hirer],
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Booking with id=" + id,
      });
    });
};

// Update a Booking by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  booking
    .update(req.body, { where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Booking was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Booking with id=${id}. Maybe booking was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Booking with id=" + id,
      });
    });
};

// Delete a Booking with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  booking
    .destroy({ where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Booking was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Booking with id=${id}. Maybe Booking was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Booking with id=" + id,
      });
    });
};

// Delete all Booking from the database.
exports.deleteAll = (req, res) => {
  booking
    .destroy({
      where: {},
      truncate: false,
    })
    .then((nums) => {
      res.send({ message: `${nums} Booking were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Booking.",
      });
    });
};

exports.updateBookingStatus = (req, res) => {
  booking
    .update(
      { bookingStatus: req.body.bookingStatus },
      {
        where: {
          id: req.params.id,
        },
      }
    )
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while updating Booking status.",
      });
    });
};

exports.extendReturnDate = (req, res) => {
  booking
    .update(
      { returnDate: req.body.returnDate },
      {
        where: {
          id: req.params.id,
        },
      }
    )
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while updating Booking Return Date.",
      });
    });
};

// Find all available Booking
exports.findAllForStatus = (req, res) => {
  booking
    .findAll({
      where: { bookingStatus: req.body.bookingStatus },
      include: [additionalEquipment, vehicle, hirer],
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Booking.",
      });
    });
};

exports.completeBooking = async(req, res) => {
	try{
		const result =  await db.sequelize.transaction(async (t) => {
			// return additional equipment
			if (req.body.additionalEquipmentId) {
				req.body.additionalEquipmentId.map((aequipment) => {
					additionalEquipment
						.increment("quantity", { by: 1, where: { id: aequipment },transaction: t});
				});
			};
			//return vehicle
			await vehicle.increment("quantity", { by: 1, where: { id: req.body.vehicleId }, transaction:t});
			
			//mark booking completed
			await booking.update({ bookingStatus: req.body.bookingStatus },{ where: {id: req.params.id}, transaction:t});
	
		});
		res.send(result);

	}catch(error){
		res.status(500).send({
			message:
			error.message && "Some error occurred while Completing the Booking.",
		});
	}	
};

calculatePrice =(bookedDate, returnDate, vehicleCost)=>{
	let bookingDate=parseISO(bookedDate);
	let returningDate= parseISO(returnDate);
	let totalDays=differenceInCalendarDays(returningDate, bookingDate);
	 return totalDays * vehicleCost;
}