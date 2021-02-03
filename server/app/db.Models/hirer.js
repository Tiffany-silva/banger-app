module.exports = (sequelize, Sequelize) => {
    const Hirer= sequelize.define('hirer', {

        firstName: Sequelize.STRING,
        lastName: Sequelize.STRING,
        nic: Sequelize.STRING,
        dob: Sequelize.DATEONLY,
        photoURL: Sequelize.STRING,
        proofURL: Sequelize.STRING,
        drivingLicenseUrl: Sequelize.STRING,
        confirmIdentity: Sequelize.BOOLEAN,
        address: Sequelize.STRING,
        email:Sequelize.STRING,
        password: Sequelize.STRING,
        blackListed: Sequelize.BOOLEAN,
        token: Sequelize.STRING,

    });
    return Hirer;
}
