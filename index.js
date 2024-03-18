const CENTS = 100;
const PERCENTAGE = 100;

class Room {


    constructor(name, rate, discount) {
        this.name = name;
        this.rate = rate;
        this.discount = discount;
        this.bookings = [];
    }

    isOccupied(date) {
        if (typeof (date) !== 'string') throw new Error('Invalid Format')
        if (isNaN(Date.parse(date))) throw new Error('Invalid Date');

        const date_parse = new Date(date).getTime();

        return this.bookings.some(booking => {
            const checkIn = new Date(booking.checkIn).getTime();
            const checkOut = new Date(booking.checkOut).getTime();
            if(checkIn <= date_parse && checkOut > date_parse) {
                return true;
            }
            return false;
        });
    }

    occupancyPercentage(startDate, endDate) {
        if (typeof (startDate) !== 'string' || typeof (endDate) !== 'string') throw new Error('Invalid Format')
        if (isNaN(Date.parse(startDate)) || isNaN(Date.parse(endDate))) throw new Error('Invalid Date');

        if(startDate > endDate) throw new Error('Start Date Greater Than End Date')

        const start = new Date(startDate);
        const end = new Date(endDate);
        let occupiedDays = 0;
        let totalDays = 0;

        while (start < end) {
            totalDays++;
            if (this.isOccupied(start.toString())) {
                occupiedDays++;
            }
            start.setDate(start.getDate() + 1);
        }
        
        return Math.round((occupiedDays / totalDays * 100));
    }

    errorDiscount() {
        if (this.discount > 100) this.discount = 100;
        if (this.discount < 0) this.discount = 0;
    }

    priceToCent() {
        return (this.rate - ((this.rate * this.discount) / PERCENTAGE)) * CENTS;
    }

    static totalOccupancyPercentage(rooms, startDate, endDate) {

    }

    static availableRooms(rooms, startDate, endDate) {

    }
}

class Booking {

    constructor({ name, email }, checkIn, checkOut, discount) {
        this.name = name;
        this.email = email;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.discount = discount;
        this.room = new Room();
    }

    getFee() {
        this.room.priceToCent() - (this.room.priceToCent() * this.discount / PERCENTAGE);
    }

    errorDiscount() {
        ///if(this.room.discount === 100) this.discount = 10;
        if (this.discount > 100) this.discount = 100;
        if (this.discount < 0) this.discount = 0;
    }
}

module.exports = {
    Room,
    Booking
}