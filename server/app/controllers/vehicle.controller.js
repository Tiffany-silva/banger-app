const db = require('../db.Models');
const booking = db.booking;
const vehicle=db.vehicle;


// Create and Save a new Vehicle
exports.create = (req, res) => {
  // Validate request
	if (!req.body) {
		res.status(400).send({
			message: 'Content can not be empty!',
		});
		return;
	}
	// Create a vehicle
    let newVehicle = {
      vehicleName:req.body._vehicleName, 
      vehicleType:req.body._vehicleType, 
      quantity:req.body._quantity, 
      price:req.body._price
    }

    console.log(newVehicle)
	// Save Vehicle in the database
	vehicle.create(newVehicle)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message ||
					'Some error occurred while creating the Vehicle.',
			});
		});
}

// Retrieve all Vehicle from the database.
//clerk view
exports.findAll = (req, res) => {
	vehicle.findAll().then((vehicles) => res.json(vehicles));
 }

// Find a single Vehicle with an id
exports.findOne = (req, res)=> { 
	const id = req.params.id;

  vehicle.findOne({ where: { id: id } }).then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Vehicle with id=" + id
      });
    });
}

// Delete a Vehicle with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  vehicle.destroy({ where: { id: id } })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Vehicle was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Vehicle with id=${id}. Maybe Vehicle was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Vehicle with id=" + id
      });
    });

};

// Delete all Vehicles from the database.
exports.deleteAll=(req, res) =>{ 
	vehicle.destroy({
		where: {},
		truncate: false
	  })
		.then(nums => {
		  res.send({ message: `${nums} Vehicles were deleted successfully!` });
		})
		.catch(err => {
		  res.status(500).send({
			message:
			  err.message || "Some error occurred while removing all Vehicles."
		  });
		});
}


exports.updatePrice=(req, res)=>{
    console.log(req);
    vehicle.update({ price: req.body.price }, {
        where: {
          id: req.params.id
        }
      }).then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while updating price."
        });
      });;
}


exports.updateQuantity=(req, res)=>{
  vehicle.update({ quantity: req.body.quantity }, {
      where: {
        id: req.params.id
      }
    }).then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while updating quantity."
      });
    });;
}

// Find all bookings of vehicles
exports.findAllBookingsofVehicle=(req, res)=>{ 
	vehicle.findAll({ where: { id: req.params.id }, include: {
      model: booking }})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving all Bookings of vehicle."
      });
    });
}

