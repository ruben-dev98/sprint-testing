const CENTS = 100;
const PERCENTAGE = 100;

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

    errorDisocunt() {
        if(this.discount > 100)this.discount = 100;
        if(this.discount < 0)this.discount = 0;
    }

    priceToCent() {
        return (this.rate - ((this.rate * this.discount)/PERCENTAGE)) * CENTS;
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
        this.room = new Room();
    }

    getFee() {
        this.room.priceToCent()  - (this.room.priceToCent() * this.discount/PERCENTAGE);
    }

    errorDisocunt() {
        ///if(this.room.discount === 100) this.discount = 10;
        if(this.discount > 100)this.discount = 100;
        if(this.discount < 0)this.discount = 0;
    }
}

module.exports = {
    Room,
    Booking
}