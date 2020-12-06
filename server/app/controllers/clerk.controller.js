const db = require('../db.Models');
const clerk=db.clerk;

// Create and Save a new Clerk
exports.create = (req, res) => {
	// Validate request
	if (!req.body) {
		res.status(400).send({
			message: 'Content can not be empty!',
		});
		return;
	}
  let clerkUser = { name: req.body.name, email: req.body.email, password: req.body.password}
    
    console.log(clerkUser);
	// Save clerk in the database
	clerk.create(clerkUser)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message ||
					'Some error occurred while creating the Clerk.',
			});
		});
}

// Retrieve all Booking from the database.
//clerk view
exports.findAll = (req, res) => {
	clerk.findAll().then((users) => res.json(users));
 }

// Find a single Booking with an id
exports.findOne = (req, res) => { 
	const id = req.params.id;

  clerk.findOne({ where: { id: id }}).then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Clerk with id=" + id
      });
    });
}


// Delete a Clerk with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  clerk.destroy({ where: { id: id } })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Clerk was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Clerk with id=${id}. Maybe Clerk was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Clerk with id=" + id
      });
    });

};


exports.updateEmail = (req, res) => {
    clerk.update({ email: req.body.email }, {
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

exports.updatePassword = (req, res) => {
    clerk.update({ password: req.body.password }, {
        where: {
          id: req.params.id
        }
      }).then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while updating Booking Return Date."
        });
      });;
}

exports.updateName = (req, res) => {
    clerk.update({ name: req.body.name }, {
        where: {
          id: req.params.id
        }
      }).then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while updating name."
        });
      });;
}




