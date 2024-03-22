const { Booking, Room } = require("./index");

function classTemplate(bookings) {
    const roomTemplate = { name: 'Double Bed', rate: 120, discount: 20 };

    const bookingTemplate = {
        name: 'Ruben D',
        email: 'ruben.dopico.dev@gmail.com'
    };

    const room = new Room({ ...roomTemplate });
    bookings.forEach((booking) => {
        room.bookings.push(new Booking({...bookingTemplate, ...booking, room: room}));
    });
    const bookingRoom = new Booking({ ...bookingTemplate, checkIn: '2024-01-01', checkOut: '2024-01-02', discount: 10, room: room });
    const booking1Room = new Booking({ ...bookingTemplate, checkIn: '2024-01-02', checkOut: '2024-01-03', disocunt: 10, room: room });
    room.bookings = [bookingRoom, booking1Room];

    return room;
}

module.exports = {
    classTemplate
}