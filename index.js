export class Room {
    name;
    Bookings;
    Rate;
    Discount;

    isOccupied(date) {

    }

    occupancyPercentage(startDate, endDate) {

    }

    static totalOccupancyPercentage(rooms, startDate, endDate) {

    }

    static availableRooms(rooms, startDate, endDate) {

    }
}

export class Booking {
    name;
    email;
    checkIn;
    checkOut;
    discount;

    getFee() {

    }
}