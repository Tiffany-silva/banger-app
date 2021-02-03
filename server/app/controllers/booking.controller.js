/**
 * booking.controller.js
 * @author: Supeshala Silva
 * @date: 23-11-2020
 * @description: This represents the controller for the booking component
 *               Includes all the server side controller functions
 */


const db = require("../db.Models");
const differenceInCalendarDays = require('date-fns/differenceInCalendarDays')
const eachDayOfInterval=require('date-fns/eachDayOfInterval');
const parseISO = require('date-fns/parseISO');
var startOfDay = require('date-fns/startOfDay')
var endOfDay = require('date-fns/endOfDay')
var toDate = require('date-fns/toDate')
var isWithinInterval = require('date-fns/isWithinInterval')
const booking = db.booking;
const additionalEquipment = db.additionalEquipment;
const vehicle = db.vehicle;
const hirer = db.hirer;
const Op = db.Sequelize.Op;

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
  console.log(req.body);

  // Create a Booking
  let bookingVehicle = {
    hirerId: req.body._hirerId,
    bookingStatus: req.body._status,
    bookingDate: req.body._bookedDate,
    returnDate: req.body._returnDate,
    totalPrice: req.body._totalPrice,
    vehicleId: req.body._vehicleID,
    licenseNumber: req.body._licenseNumber
  };

	try{
		const result =  await db.sequelize.transaction(async (t) => {

			//Save the booking
			let book= await booking.create(bookingVehicle, {transaction: t});

			//save the additional equipments and booking
			if (req.body._additionalEquipment) {
				await book.addAdditionalEquipments(req.body._additionalEquipment, {transaction: t});
			}
		});

		res.send(result);
	}catch(error){
		res.status(500).send({
			message:
			error.message,
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
  booking.findAll({include: [additionalEquipment, vehicle, hirer]}).then((bookings) => res.json(bookings));
};

/**
 *@description {Find a single Booking with an id and return all details}
 * @param {requesting for the booking provided the id} req
 * @param {response consisting of bookings} res
 */
exports.findOne = (req, res) => {
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

exports.extendReturnDate = async (req, res) => {

  try{
		const result =  await db.sequelize.transaction(async (t) => {

			//Save the booking
			await booking.update({ returnDate: req.body.returnDate },
        {
          where: {
            id: req.params.id,
          },
        }, {transaction: t});
			 await booking.update({ bookingStatus: "Extended"},
          {
            where: {
              id: req.params.id,
            },
          }, {transaction: t});
		});

		res.send(result);
	}catch(error){
		res.status(500).send({
			message:
			error.message,
		});
	}
};

// Find all available Booking
exports.findAllForStatusOfUser = (req, res) => {
  booking
    .findAll({
      where: { bookingStatus: req.query.bookingStatus, hirerId: req.query.id },
      include: [additionalEquipment, vehicle],
      order:[['updatedAt','DESC']]
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

// Find all available Booking
exports.findAllForStatus = (req, res) => {
  booking
    .findAll({
      where: { bookingStatus: req.query.bookingStatus},
      include: [additionalEquipment, vehicle],
      order:[['updatedAt','DESC']]
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


exports.findAllBookingsOfUser = (req, res) => {
  booking
    .findAll({
      where: { hirerId: req.params.email },
      include: [additionalEquipment, vehicle],
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Bookings.",
      });
    });
};

exports.completeBooking = async(req, res) => {
	try{
		const result =  await db.sequelize.transaction(async (t) => {

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


getDatesInRange=(start,end)=>{
 let s=toDate(start);
 let e=toDate(end);
  var result = eachDayOfInterval({
    start: s,
    end: e
  })
  return result;
}

exports.getAvailableVehicles= (req, res)=>{
  let startDate=parseISO(req.body.startdate);
  let endDate=parseISO(req.body.enddate);
  let requested=getDatesInRange(startDate,endDate);
  console.log(requested);
  vehicle.findAll().then( vehiclesList=>{
    let vehicles=vehiclesList;
     booking.findAll({
      where: {
        bookingStatus: {
          [Op.or]: ["Booked", "Pending", "Picked", "Extended"]
        }
      }
      }).then(bookedVehicles=>{
          console.log(bookedVehicles);
      bookedVehicles.forEach(element => {
        requested.some(function (book){
          let isDateExist=isWithinInterval(book, {
            start:element.bookingDate,
            end: element.returnDate
          })
          console.log(isDateExist);
          if(isDateExist===true){
            console.log(element.vehicleId)
            let index=vehicles.findIndex(item => item.id === element.vehicleId);
            console.log(index);
            console.log(vehicles[index]);
            if(index!=-1){
              vehicles[index].quantity-=1;
              console.log(vehicles[index]);
            }
            return isDateExist;
          };
        })
        console.log("booking" + element.id);
    })
    res.send(vehicles);
    }).catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while checking available vehicles.",
      });
    });
  });
}

exports.getAvailableEquipments= (req, res)=>{
  let startDate=parseISO(req.body.startdate);
  let endDate=parseISO(req.body.enddate);

  let requested=getDatesInRange(startDate,endDate);
  additionalEquipment.findAll().then( list=>{
    let aeList=list;
     booking.findAll({
       where: {
         bookingStatus: {
           [Op.or]: ["Booked", "Pending", "Picked", "Extended"]
         }
       },include:{
        model:additionalEquipment, through: {attributes: []}
      }
    }).then(bookings=>{
      console.log(bookings)
      bookings.forEach(element => {

        if(Array.isArray(element.additionalEquipments) && element.additionalEquipments.length>0){

          requested.some(function (el){

            let isDateExist=isWithinInterval(el, {
                  start: (element.bookingDate),
                  end: (element.returnDate)
                })

            if(isDateExist===true){
              element.additionalEquipments.forEach(ae=>{
                let index=aeList.findIndex(item => item.id === ae.id);
                if(index!=-1){
                  aeList[index].quantity-=1;
                  console.log(aeList[index]);
                }
              });
              return isDateExist;
            }
          })
          }
        }

    )
    res.send(aeList);
    }).catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while checking available equipments.",
      });
    });
  });
}

exports.getAvailabilityOfVehicle= (req, res)=>{
  let startDate=parseISO(req.body.startdate);
  let endDate=parseISO(req.body.enddate);
  let id=req.body.id;
  let requested=getDatesInRange(startDate,endDate);
  let bookingCount=[];
  vehicle.findOne({ where: { id: id } }).then( vehicle=>{
    let vehicleBooking=vehicle;
     booking.findAll({
      where: {
        [Op.and]:[
         { bookingStatus: {
             [Op.or]: ["Booked", "Pending", "Picked", "Extended"]
           }},
          {vehicleId: id}
        ],
      },attributes: ['id','bookingDate', 'returnDate']
    }).then(bookings=>{
      bookings.forEach(element => {
        requested.forEach(book=>{
          let isDateAvailable=isWithinInterval(book, {
            start:element.bookingDate,
            end: element.returnDate
          })
          if(isDateAvailable===true){
            let count = bookingCount.find(count => count.booking === element.id);
            if(count){
              count.count=count.count+1;
            }else{
              let count={booking:element.id, count:1}
              bookingCount.push(count);
            }
          }
        })

    })
      bookingCount.forEach(element=>{
        if(element.count>0){
          vehicleBooking.quantity-=1;
        }
      })

    res.send(vehicleBooking);
    }).catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while checking availability of Vehicle.",
      });
    });
  });
}


exports.checkForBookingAvailability= (req, res)=>{

  let start=startOfDay(parseISO(req.query.date));
  let end=endOfDay(parseISO(req.query.date));

     booking.findAll({
      where: {
        [Op.and]:[
          {
            bookingStatus: {
              [Op.or]: ["Booked", "Pending", "Picked", "Extended"]
            }
          },
         {
           bookingDate: {
          [Op.gt]: start,
          [Op.lt]: end
          }
         }
        ]
      }
    }).then(data=>{
     console.log(data);
    res.send(data);
    }).catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while checking availability of Booking.",
      });
    });
  }
