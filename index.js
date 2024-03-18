const CENTS = 100;
const PERCENTAGE = 100;

class Room {
    

    constructor({name, rate, discount}) {
        this.name = name;
        this.rate = rate;
        this.discount = discount;
        this.bookings = [];
    }

    isOccupied(date) {
        if(typeof(date) !== 'string') throw new Error('Invalid Format')
        if(isNaN(Date.parse(date))) throw new Error('Invalid Date');

        return this.bookings.some(booking => booking.checkIn <= date && booking.checkOut > date);
    }

    occupancyPercentage(startDate, endDate) {
        if(typeof(startDate) !== 'string' && typeof(endDate) !== 'string') throw new Error('Invalid Format')
        if(isNaN(Date.parse(startDate)) && isNaN(Date.parse(endDate))) throw new Error('Invalid Date');

        const start = new Date(startDate);
        const end = new Date(endDate);
        let occupiedDays = 0;
        let totalDays = 0;

        while(startDate <= endDate) {
            totalDays++;
            if(this.isOccupied(start.toString())) {
                occupiedDays++;
            }
            start.setDate(start.getDate() + 1);
        }

        return (occupiedDays/totalDays*100).toFixed(0);
    }

    errorDiscount() {
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

    errorDiscount() {
        ///if(this.room.discount === 100) this.discount = 10;
        if(this.discount > 100)this.discount = 100;
        if(this.discount < 0)this.discount = 0;
    }
}

module.exports = {
    Room,
    Booking
}