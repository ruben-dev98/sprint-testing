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

    static priceToCent() {
        return (this.rate - ((this.rate * this.discount)/100)) * 100;
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
        
    }

    errorDisocunt() {
        if(this.room.discount === 100) this.discount = 10;
        if(this.discount > 100)this.discount = 100;
        if(this.discount < 0)this.discount = 0;
    }
}

module.exports = {
    Room,
    Booking
}