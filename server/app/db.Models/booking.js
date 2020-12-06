module.exports = (sequelize, Sequelize) => {
    const Booking= sequelize.define('booking', {
        bookingStatus:Sequelize.STRING,
        bookingDate: Sequelize.DATE,
        returnDate: Sequelize.DATE,
        totalPrice: Sequelize.DOUBLE
    });
    return Booking;
}