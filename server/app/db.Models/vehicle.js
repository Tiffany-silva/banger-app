module.exports = (sequelize, Sequelize) => {
    const Vehicle=sequelize.define('vehicle', {
        vehicleName: Sequelize.STRING,
        vehicleType: Sequelize.STRING,
        quantity: Sequelize.INTEGER,
        price: Sequelize.DOUBLE,
    });
    return Vehicle;
}