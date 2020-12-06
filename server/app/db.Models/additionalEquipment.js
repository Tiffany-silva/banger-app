module.exports = (sequelize, Sequelize) => {
    const additionalEquipment= sequelize.define('additionalEquipment', {
        equipmentType: Sequelize.STRING,
        quantity: Sequelize.INTEGER,
    })
    return additionalEquipment;
}