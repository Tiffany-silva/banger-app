module.exports = (sequelize, Sequelize) => {
  const User= sequelize.define('user', {
    identityNum: Sequelize.STRING
  });
  return User;
}
