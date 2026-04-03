//
const { makeReservation } = require("../models/reservationModel");

const handleReservation = async (data) => {
    try {
        const id = await makeReservation(data);
        return `✅ Reservation confirmed with ID: ${id}`;
    } catch (err) {
        return "❌ Failed to make reservation.";
    }
};

module.exports = { handleReservation };
