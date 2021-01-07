const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db= require("../server/app/db.Models")
const app = express();
const clerk= require("../server/app/routes/clerk.routes")
const vehicle=require("../server/app/routes/vehicle.routes")
const aEquipment=require("../server/app/routes/additionalEquipment.routes")
const hirer=require("../server/app/routes/hirer.routes")
const booking = require("../server/app/routes/booking.routes");
const auth=require("../server/app/routes/auth.routes");

var corsOptions = {
  origin: true 
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

app.use('/api/clerk', clerk);
app.use('/api/vehicle', vehicle);
app.use('/api/additionalEquipment', aEquipment);
app.use('/api/hirer', hirer);
app.use('/api/booking', booking);
app.use('/api/auth', auth);
// require('../server/app/routes/auth.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


// db.sequelize.sync();