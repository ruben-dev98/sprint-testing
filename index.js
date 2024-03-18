class Room {

    constructor({name, rate, discount}) {
        this.name = name;
        this.bookings = [];
        this.rate = rate;
        this.discount = discount;
    }

    isOccupied(date) {
        if(typeof(date) !== 'string') throw new Error('Invalid Format')
        if(isNaN(Date.parse(date))) throw new Error('Invalid Date');

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

    constructor({name, email}, checkIn, checkOut, discount) {
        this.name = name;
        this.email = email;
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