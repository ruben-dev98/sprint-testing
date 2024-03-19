const CENTS = 100;
const ONE_HUNDRED_PERCENTAGE = 100;
const INIT_TOTAL_DAYS = 0;
const INIT_OCCUPIED_DAYS = 0;
const SUM_ONE_DAY = 1;
const INIT_TOTAL_OCCUPANCY_PERCENTAGE = 0;
const ZERO_PERCENTAGE = 0;

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
            if (checkIn <= date_parse && checkOut > date_parse) {
                return true;
            }
            return false;
        });
    }

    occupancyPercentage(startDate, endDate) {
        if (typeof (startDate) !== 'string' || typeof (endDate) !== 'string') throw new Error('Invalid Format')
        if (isNaN(Date.parse(startDate)) || isNaN(Date.parse(endDate))) throw new Error('Invalid Date');

        if (startDate > endDate) throw new Error('Start Date Greater Than End Date')

        const start = new Date(startDate);
        const end = new Date(endDate);
        let occupiedDays = INIT_OCCUPIED_DAYS;
        let totalDays = INIT_TOTAL_DAYS;

        while (start < end) {
            totalDays++;
            if (this.isOccupied(start.toString())) {
                occupiedDays++;
            }
            start.setDate(start.getDate() + SUM_ONE_DAY);
        }

        return Math.round((occupiedDays / totalDays * ONE_HUNDRED_PERCENTAGE));
    }

    errorDiscount() {
        if(isNaN(this.discount)) throw new Error('Invalid Discount Room Format');
        
        if (this.discount > 100) this.discount = 100;
        if (this.discount < 0) this.discount = 0;
    }

    priceToCent() {
        if(isNaN(this.rate)) throw new Error('Invalid Rate Room Format')
        return (this.rate - ((this.rate * this.discount) / ONE_HUNDRED_PERCENTAGE)) * CENTS;
    }

    static totalOccupancyPercentage(rooms, startDate, endDate) {
        if(!Array.isArray(rooms)) throw new Error('Not an Array')
        if(rooms.length === 0) throw new Error('Array is empty');
        
        let totalPercentage = INIT_TOTAL_OCCUPANCY_PERCENTAGE;
        rooms.forEach(room => {
            totalPercentage += room.occupancyPercentage(startDate, endDate);
        });

        return Math.round(totalPercentage/rooms.length);
    }

    static availableRooms(rooms, startDate, endDate) {
        if(!Array.isArray(rooms)) throw new Error('Not an Array')
        if(rooms.length === 0) throw new Error('Array is empty');
        const aAvailableRooms = rooms.filter(room => {
            if (room.occupancyPercentage(startDate, endDate) > ZERO_PERCENTAGE) {
                return false;
            }
            return true;
        });
        return aAvailableRooms;
    }
}

class Booking {

    constructor({ name, email }, checkIn, checkOut, discount, room) {
        this.name = name;
        this.email = email;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.discount = discount;
        this.room = room;
    }

    getFee() {
        this.room.errorDiscount();
        this.errorDiscount();
        return Math.round(this.room.priceToCent() - (this.room.priceToCent() * this.discount / ONE_HUNDRED_PERCENTAGE));
    }

    errorDiscount() {
        if(isNaN(this.discount)) throw new Error('Invalid Discount Booking Format');
        if (this.room.discount === ONE_HUNDRED_PERCENTAGE) this.discount = ZERO_PERCENTAGE;
        if (this.discount > ONE_HUNDRED_PERCENTAGE) this.discount = ONE_HUNDRED_PERCENTAGE;
        if (this.discount < ZERO_PERCENTAGE) this.discount = ZERO_PERCENTAGE;
    }
}

module.exports = {
    Room,
    Booking
}