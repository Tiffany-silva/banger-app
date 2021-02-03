const got = require("got");
const cheerio = require('cheerio');

exports.compareRates = (req,res) => {
  (async () => {
    try {
      got('https://www.malkey.lk/rates/self-drive-rates.html#standard').then(
        data=> {
          const vehicles = [];
          let $ = cheerio.load(data.body);
          $('table > tbody > tr > td.text-left.percent-40').toArray().map(item => {
            let vehicle = {'vehicleName': $(item).text().trim()};
            vehicles.push(vehicle);
          });
          let count = 0;
          let array = $('table > tbody > tr > td.text-center.percent-22').toArray();
          for (let i = 0; i < array.length; i += 3) {
            vehicles[count]["ratePerMonth"] = $(array[i]).text().trim();
            vehicles[count]["ratePerWeek"] = $(array[i + 1]).text().trim();
            vehicles[count]["excessMileagePerDay"] = $(array[i + 2]).text().trim();
            count++;
          }
    res.status(200).send(vehicles);
        })
    } catch (error) {
      res.send(error);
      console.log(error.response.body);
    }
  })();
};
