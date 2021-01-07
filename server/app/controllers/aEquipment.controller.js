const db = require('../db.Models');
const AdEquipment = db.additionalEquipment;
const Op = db.Sequelize.Op;

// Create and Save a new additional equipment
exports.create =(req, res) => {
  // Validate request
  console.log(req.body);
	if (!req.body) {
		res.status(400).send({
			message: 'Content can not be empty!',
		});
		return;
	}
	// Create an additional Equipment
	let additionalEquipment = {quantity : req.body.quantity, equipmentType: req.body.equipmentType}
	// Save Tutorial in the database
	AdEquipment.create(additionalEquipment)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message ||
					'Some error occurred while creating the Additional Equipment.',
			});
		});
}

// Retrieve all additional equipment from the database.
exports.findAll= (req, res)=> {
	AdEquipment.findAll().then((addEquipment) => res.json(addEquipment))
 }

// Find a single additional equipment with an id
exports.findOne=(req, res)=> { 
	const id = req.params.id;

  AdEquipment.findByPk(id).then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Additional Equipment with id=" + id
      });
    });
}

// Update a additional equipment by the id in the request
exports.update=(req, res)=>{
	const id = req.params.id;

  AdEquipment.update(req.body, {where: { id: id }})
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Additional Equipment was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Additional Equipment with id=${id}. Maybe Equipment was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Additional Equipment with id=" + id
      });
    });
 }

// Delete a additional equipment with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  AdEquipment.destroy({ where: { id: id } })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Additional Equipment was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Additional Equipment with id=${id}. Maybe Additional Equipment was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Additional Equipment with id=" + id
      });
    });

};

// Delete all additional equipment from the database.
exports.deleteAll=(req, res) => { 
	AdEquipment.destroy({
		where: {},
		truncate: false
	  })
		.then(nums => {
		  res.send({ message: `${nums} Additional Equipments were deleted successfully!` });
		})
		.catch(err => {
		  res.status(500).send({
			message:
			  err.message || "Some error occurred while removing all Additional Equipments."
		  });
		});
}

// Find all available additional equipments
exports.findAllAvailable=(req, res)=> { 
	AdEquipment.findAll({ where: { quantity: {[Op.gt]: 0}} })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Additional Equipments."
      });
    });
}

exports.updateQuantity= (req, res)=> {
  AdEquipment.update({ quantity: req.body.quantity }, {
      where: {
        id: req.params.id
      }
    }).then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while updating Quantity."
      });
    });;
}


