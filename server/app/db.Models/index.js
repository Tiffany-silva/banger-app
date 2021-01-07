const dbConfig = require("../configuration/config.db.js");

const Sequelize = require("sequelize");
const bookingModel = require("./booking.js");
const clerkModel = require("./clerk.js");
const vehicleModel = require("./vehicle.js");
const additionalEquipmentModel = require("./additionalEquipment.js");
const hirerModel=require("./hirer.js");
const roleModel=require("./role");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.hirer = hirerModel(sequelize, Sequelize);
db.booking = bookingModel(sequelize, Sequelize);
db.booking_additionalEquipment= sequelize.define('booking_additionalEquipment', {});
db.vehicle=vehicleModel(sequelize, Sequelize);
db.clerk = clerkModel(sequelize, Sequelize);
db.additionalEquipment = additionalEquipmentModel(sequelize, Sequelize);
db.role= roleModel(sequelize, Sequelize);

db.hirer.hasMany(db.booking);
db.booking.belongsTo(db.hirer);

db.vehicle.hasMany(db.booking);
db.booking.belongsTo(db.vehicle);

db.additionalEquipment.belongsToMany(db.booking, {through: db.booking_additionalEquipment, unique: false  });
db.booking.belongsToMany(db.additionalEquipment, { through: db.booking_additionalEquipment, unique: false });

db.role.hasMany(db.clerk);
db.clerk.belongsTo(db.role);

db.role.hasMany(db.hirer);
db.hirer.belongsTo(db.role);

db.ROLES = ["clerk", "hirer"];

sequelize.sync({ force: false })
  .then(() => {
    console.log(`Database & tables created!`)
    // initial();
    }
)
function initial() {
  db.role.create({
    id: 1,
    name: "hirer"
  });
 
  db.role.create({
    id: 2,
    name: "clerk"
  });
}


module.exports = db;