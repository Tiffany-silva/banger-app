module.exports = (sequelize, Sequelize) => {
    const Hirer= sequelize.define('hirer', {
       
        firstName: Sequelize.STRING,
        lastName: Sequelize.STRING,
        dob: Sequelize.DATEONLY,
        photoURL: Sequelize.STRING,
        confirmIdentity: Sequelize.BOOLEAN,
        drivingLicenseUrl: Sequelize.STRING,
        address: Sequelize.STRING,
        email:Sequelize.STRING,
        password: Sequelize.STRING,
        blackListed: Sequelize.BOOLEAN,
        token: Sequelize.STRING
    });
    return Hirer;
}