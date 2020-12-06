
module.exports = (sequelize, Sequelize) => {
    const Clerk= sequelize.define('clerk', {
      
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.STRING
    });
    return Clerk;
}