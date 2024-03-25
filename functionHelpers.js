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
    
    return room;
}

module.exports = {
    classTemplate
}