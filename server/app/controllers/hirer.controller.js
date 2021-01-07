const db = require('../db.Models');
const booking = db.booking;
const additionalEquipment=db.additionalEquipment;
const vehicle=db.vehicle;
const hirer=db.hirer;

// Create and Save a new Hirer
exports.create =(req, res) => {
	// Validate request
	if (!req.body) {
		res.status(400).send({
			message: 'Content can not be empty!',
		});
		return;
	}
	// Create a Hirer
    let hirerUser = {
      firstName:req.body.firstName,
      lastName:req.body.lastName,
      photoURL:req.body.photoURL, 
      confirmIdentity:req.body.confirmIdentity ? req.body.confirmIdentity : false ,
      drivingLicenseUrl:req.body.drivingLicenseUrl ? req.body.drivingLicenseUrl : null,
      address:req.body.address,
      dob:req.body.dob,
      blackListed: false, 
      email:req.body.email,
      password:req.body.password
    }
    
	// Save Hirer in the database
	hirer.create(hirerUser)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message ||
					'Some error occurred while creating the Hirer.',
			});
		});
}

// Retrieve all Hirer from the database.
//clerk view
exports.findAll=(req, res) => {
	hirer.findAll().then((hirers) => res.json(hirers));
 }

// Find a single Hirer with an id
exports.findOne= (req, res)=> { 
	const id = req.params.id;

  hirer.findOne({ where: { id: id }}).then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving hirer with id=" + id
      });
    });
}

// Update a Hirer by the id in the request
exports.update =(req, res)=> {
	const id = req.params.id;

  hirer.update(req.body, {where: { id: id }})
    .then(num => {
      if (num == 1) {
        res.send({
          message: "hirer was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update hirer with id=${id}. Maybe hirer was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating hirer with id=" + id
      });
    });
 }

// Delete a Hirer with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  console.log(id)
  hirer.destroy({ where: { id: id } })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "hirer was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Hirer with id=${id}. Maybe Hirer was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Hirer with id=" + id
      });
    });

};

// Delete all Hirer from the database.
exports.deleteAll =(req, res)=>{ 
	hirer.destroy({
		where: {},
		truncate: false
	  })
		.then(nums => {
		  res.send({ message: `${nums} Hirer were deleted successfully!` });
		})
		.catch(err => {
		  res.status(500).send({
			message:
			  err.message || "Some error occurred while removing all Hirers."
		  });
		});
}


exports.confirmIdentity =(req, res)=>{
    hirer.update({ drivingLicenseUrl: req.body.drivingLicenseUrl, confirmIdentity: req.body.confirmId }, {
        where: {
          id: req.params.id
        }
      }).then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while confirming identity."
        });
      });;
}

exports.updatePhotoURL=(req, res)=> {
    hirer.update({ photoURL: req.body.photoURL }, {
        where: {
          id: req.params.id
        }
      }).then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while updating photo url."
        });
      });;
}

exports.updateEmail= (req, res)=> {
  hirer.update({ email: req.body.email }, {
      where: {
        id: req.params.id
      }
    }).then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while updating email."
      });
    });;
}

exports.updatePassword=(req, res)=>{
  hirer.update({ password: req.body.password }, {
      where: {
        id: req.params.id
      }
    }).then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while updating password."
      });
    });;
}

exports.updateAddress=(req, res)=>{
  hirer.update({ address: req.body.address }, {
      where: {
        id: req.params.id
      }
    }).then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while updating address."
      });
    });;
}

// Find all available blacklisted
exports.findAllBlacklisted=(req, res)=> { 
	hirer.findAll({ where: { blacklisted: true }})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Blacklisted hirers."
      });
    });
}

exports.blackList=(req, res)=>{
  console.log(req.body.blackListed);
  hirer.update({ blackListed: req.body.blackListed }, {
      where: {
        id: req.params.id
      }
    }).then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while Blacklisting user."
      });
    });;
}

// Find all available bookings of hirer
exports.findAllBookingsOfHirer=(req, res)=>{ 
	booking.findAll({ where: { hirerId: res.body.id }, include: [
    {
      model: booking, 
      include: [
        vehicle, additionalEquipment
      ]  
    }
  ]})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving all Bookings of hirer."
      });
    });
}

exports.isBlacklisted = (req, res) => {
  const id = req.params.id;

  hirer
    .findOne({
      where: { id: id },
      attributes: ['blackListed']
      
    } )
    .then((data) => {
      console.log(data)
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Booking with id=" + id,
      });
    });
};



