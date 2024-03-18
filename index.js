class Room {

    constructor(name, rate, discount) {
        this.name = name;
        this.bookings = [];
        this.rate = rate;
        this.discount = discount;
    }

    isOccupied(date) {
        return this.bookings.some(booking => booking.checkIn <= date && booking.checkOut > date);
    }

    occupancyPercentage(startDate, endDate) {

    }

    static totalOccupancyPercentage(rooms, startDate, endDate) {

    }

    static availableRooms(rooms, startDate, endDate) {

    }
}

class Booking {

    constructor(template, checkIn, checkOut, discount) {
        this.name = template.name;
        this.email = template.email;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.discount = discount;
        this.Room = {};
    }

    getFee() {
        
    }

    
}

module.exports = {
    Room,
    Booking
}