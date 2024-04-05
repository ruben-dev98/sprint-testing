import { Booking, Room } from "./index";
import { iBookingTemplate, iRoom } from "./interface";

export function createAnInstanceOfRoomWithBookings(bookings: iBookingTemplate[]): Room {
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