const got = require("got");
const { createWriteStream } = require("fs");
const cron =  require('node-cron');
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const clerk= require("../server/app/routes/clerk.routes")
const vehicle=require("../server/app/routes/vehicle.routes")
const aEquipment=require("../server/app/routes/additionalEquipment.routes")
const hirer=require("../server/app/routes/hirer.routes")
const booking = require("../server/app/routes/booking.routes");
const auth=require("../server/app/routes/auth.routes");
const external=require("./app/routes/externalSystems.routes")
const webScraping=require("./app/routes/webScraping.routes")
const corsOptions = {
  origin: true
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Banger application." });
});

app.use('/api/clerk', clerk);
app.use('/api/vehicle', vehicle);
app.use('/api/additionalEquipment', aEquipment);
app.use('/api/hirer', hirer);
app.use('/api/booking', booking);
app.use('/api/auth', auth);
app.use('/api/external', external);
app.use('/api/webScraping', webScraping);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// runs everyday at 12:01 a.m and downloads the list to the server at
// the destined folder
cron.schedule('0 1 0 * * *', function() {
  console.log('running at 12:01 a.m');
  const url =
    "https://www.onedpo.com/wp-content/uploads/2019/10/Australia-License-Number.csv";

  got.stream(url).pipe(createWriteStream('./app/controllers/externalSystems/dmvLicenseList.csv'));
});

cron.schedule('0 1 0 * * *', function() {
  console.log('running at 12:01 a.m');
  const url =
    "https://www.onedpo.com/wp-content/uploads/2019/10/Argentina-IN.csv";

  got.stream(url).pipe(createWriteStream('./app/controllers/externalSystems/insuranceList.csv'));
});

