/**
 * externalSystems.controller.js
 * @author: Supeshala Silva
 * @date: 20-01-2020
 * @description: This represents the controller for the integrated external systems
 *               Includes all the server side controller functions
 */

const transporter= require("../../configuration/smtp.config");

const fs = require('fs').promises;
var parse = require('csv-parse/lib/sync');
const db = require("../../db.Models");
const dbI = require("../../db.Models/Insurance.db");

const insurance=dbI.user;
/**
 *@description {checks whether the user exists in DMV list}
 * @param {request consists of the photoURL, id, date, license Number} req
 * @param {response of the DMV status} res
 */
exports.isUserInDMVList = (req, res) => {

  (async function () {
    const fileContent = await fs.readFile(__dirname+'/dmvLicenseList.csv');
    const records = parse(fileContent, {columns: true});
    let result = records.filter(obj => {
          return obj.licenseNumber ===req.body.licenseNumber;
        })
        if (result.length===0 || !Array.isArray(result)) {
          res.status(200).send({message: "License Number is not listed in DMV list", refuseBooking: false});
        }
        else{
          sendDMVEmail(req,res);
        }
  })();
};
/**
 *@description {sends email to the DMV regarding an offence}
 * @param {request consists of the id, date, photoURL, license Number} req
 * @param {response of the email status} res
 */
sendDMVEmail = (req, res) =>{
  const { id,image, date, licenseNumber}= req.body;
 const msg=`The individual with the license ID ${licenseNumber} attempted to book a vehicle on ${date} with 'Banger.Co' which holds the registration number '123455' with DMV. A possible photograph of the individual is attached below.
Thank you,
Banger Team`;
  const mailInfo= {
    from: 'supeshalapragathisilva@gmail.com',
    to: 'silva.tiffd@gmail.com',
    subject: 'Attempted Vehicle Booking',
    text: msg,
    attachments: [
      {
        filename: 'photograph.jpg',
        path: `${image}`
      }
    ]
  };
  //smtp configured email object sends email to the specified receiver
  transporter.sendMail(mailInfo, (error, info)=>{
    if(error){
      res.send(error);
    }
  const m={message:"The License number was listed as suspended or lost. Thus, " +
    "the DMV is Successfully notified via email."}
    updateBooking(res,m.message, id);
  })
}

/**
 *@description {checks for fraud claims with the Insurers Association list}
 * @param {request consists of the NIC Number, id} req
 * @param {response of the booking} res
 */
// check fraud claims
exports.checkForFraudClaimsFromInsuranceDB = (req, res) => {
  const id = req.body.identityNumber;
  let message={description: "ID number is listed in Insurance Records"};

  insurance.findOne({ where: { identityNum: id }}).then(data => {
    if(data===null){
      res.status(200).send({message: "ID number is not listed in Insurance Records", refuseBooking: false});
    }else{
      updateBooking(res,message.description, req.body.id);
    }
  })
    .catch(err => {
      res.status(500).send({
        message: "Error occurred=" +err
      });
    });
}


exports.checkForFraudClaims = (req, res) => {
  console.log(req.body);
  (async function () {
    let message={description: "ID number is listed in Insurance Records"};
    const fileContent = await fs.readFile(__dirname+'/insuranceList.csv');
    const records = parse(fileContent, {columns: true});
    let result = records.filter(obj => {
      return obj.identityNumber ===req.body.identityNumber;
    })
    if (result.length===0 || !Array.isArray(result)) {
      res.status(200).send({message: "ID number is not listed in Insurance Records", refuseBooking: false});
    }
    else{
      updateBooking(res,message.description, req.body.id);
    }
  })();
};



// (async (id) => {
//   const {body} = await got.post('https://httpbin.org/anything', {
//     json: {
//       identityNumber: id
//     },
//     responseType: 'json'
//   });
//   //response for the post request
//   console.log(body.data);
// })();

updateBooking=(res,description, id)=>{
  db.booking
    .update(
      { description: description, bookingStatus: 'Cancelled'  },
      {
        where: {
          id: id,
        },
      }
    )
    .then((data) => {
      if(data){
        res.status(200).send({message:description, refuseBooking: true});
      }
    })
}

