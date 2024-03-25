import { Booking, Room } from "./index";
import { iBookingTemplate, iBookingTemplateSecond, iRoom } from "./interface";

export function classTemplate(bookings: iBookingTemplateSecond[]): Room {
    const roomTemplate: iRoom = { name: 'Double Bed', rate: 120, discount: 20 };

    const bookingTemplate: iBookingTemplate = {
        name: 'Ruben D',
        email: 'ruben.dopico.dev@gmail.com'
    };

    const room = new Room(roomTemplate);
    bookings.forEach((booking) => {
        room.bookings.push(new Booking({...bookingTemplate, ...booking, room: room}));
    });
    return room;
}