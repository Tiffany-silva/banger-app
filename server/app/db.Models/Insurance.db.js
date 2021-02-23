/**
 * index.js
 * @author: Supeshala Silva
 * @date: 19-11-2020
 * @description: This represents the database configuration, creation and table initializations
 *               Includes all the table creations with relationships
 */

const dbConfig = require("../configuration/config.insurance.js");
const Sequelize = require("sequelize");
const userModel = require("./user.js");

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

const dbI = {};

dbI.Sequelize = Sequelize;
dbI.sequelize = sequelize;

dbI.user = userModel(sequelize, Sequelize);


sequelize.sync({ force: false })
  .then(() => {
      console.log(`Database & tables created!`)
    }
  )

module.exports = dbI;
