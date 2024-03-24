import { Booking, Room } from "./index";
import { iBooking, iBookingTemplate, iBookingTemplateSecond, iRoom } from "./interface";

export function classTemplate(bookings: iBookingTemplateSecond[]): Room {
    const roomTemplate: iRoom = { name: 'Double Bed', rate: 120, discount: 20 };

    const bookingTemplate: iBookingTemplate = {
        name: 'Ruben D',
        email: 'ruben.dopico.dev@gmail.com'
    };

    const room = new Room({ ...roomTemplate });
    bookings.forEach((booking) => {
        room.bookings.push(new Booking({...bookingTemplate, ...booking, room: room}));
    });
    /*const bookingRoom = new Booking({ ...bookingTemplate, checkIn: '2024-01-01', checkOut: '2024-01-02', discount: 10, room: room });
    const booking1Room = new Booking({ ...bookingTemplate, checkIn: '2024-01-02', checkOut: '2024-01-03', discount: 20, room: room });*/
    //Room.bookings = [bookingRoom, booking1Room];

    return room;
}