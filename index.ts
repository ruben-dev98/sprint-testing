import { classTemplate } from "./functionHelpers";
import { iBooking, iBookingTemplateSecond, iDays, iRoom } from "./interface";

const { getTotalDays } = require("./functionHelpers");

const CENTS :number = 100;
const ONE_HUNDRED_PERCENTAGE :number = 100;
const INIT_TOTAL_DAYS :number = 0;
const INIT_OCCUPIED_DAYS :number = 0;
const SUM_ONE_DAY :number = 1;
const INIT_TOTAL_OCCUPANCY_PERCENTAGE :number = 0;
const ZERO_PERCENTAGE :number = 0;

export class Room {

    name: string;
    rate: number;
    discount: number;
    bookings: Booking[];

    constructor(room: iRoom) {
        this.name = room.name;
        this.rate = room.rate;
        this.discount = room.discount;
        this.bookings = [];
    }

    isOccupied(date: string): boolean {
        if (typeof (date) !== 'string') throw new Error('Invalid Format')
        if (isNaN(Date.parse(date))) throw new Error('Invalid Date');

        const date_parse: number = new Date(date).getTime();

        return this.bookings.some(booking => {
            const checkIn: number = new Date(booking.checkIn).getTime();
            const checkOut: number = new Date(booking.checkOut).getTime();
            return checkIn <= date_parse && checkOut > date_parse;
        });
    }

    occupancyPercentage(startDate: string, endDate: string): number {
        if (typeof (startDate) !== 'string' || typeof (endDate) !== 'string') throw new Error('Invalid Format')
        if (isNaN(Date.parse(startDate)) || isNaN(Date.parse(endDate))) throw new Error('Invalid Date');

        if (startDate > endDate) throw new Error('Start Date Greater Than End Date')

        const start: Date = new Date(startDate);
        const end: Date = new Date(endDate);
        const numberOfDates: iDays = getTotalDays(start, end);

        return Math.round((numberOfDates.occupiedDays / numberOfDates.totalDays * ONE_HUNDRED_PERCENTAGE));
    }

    /*errorDiscount(): void {
        if (isNaN(this.discount)) throw new Error('Invalid Discount Room Format');

        if (this.discount > 100) this.discount = 100;
        if (this.discount < 0) this.discount = 0;
    }*/

    priceToCent(): number {
        if (isNaN(this.rate)) throw new Error('Invalid Rate Room Format')
        return (this.rate - ((this.rate * this.discount) / ONE_HUNDRED_PERCENTAGE)) * CENTS;
    }

    static totalOccupancyPercentage(rooms: Room[], startDate: string, endDate: string): number {
        if (!Array.isArray(rooms)) throw new Error('Not an Array')
        if (rooms.length === 0) throw new Error('Array is empty');

        let totalPercentage: number = INIT_TOTAL_OCCUPANCY_PERCENTAGE;
        rooms.forEach(room => {
            totalPercentage += room.occupancyPercentage(startDate, endDate);
        });

        return Math.round(totalPercentage);
    }

    static availableRooms(rooms: Room[], startDate: string, endDate: string): Room[] {
        if (!Array.isArray(rooms)) throw new Error('Not an Array')
        if (rooms.length === 0) throw new Error('Array is empty');
        const aAvailableRooms: Room[] = rooms.filter(room => room.occupancyPercentage(startDate, endDate) === ZERO_PERCENTAGE);
        return aAvailableRooms;
    }

    getTotalDays(start: Date, end: Date): iDays {
        let occupiedDays = INIT_OCCUPIED_DAYS;
        let totalDays = INIT_TOTAL_DAYS;
    
        while (start < end) {
            totalDays++;
            if (this.isOccupied(start.toString())) {
                occupiedDays++;
            }
            start.setDate(start.getDate() + SUM_ONE_DAY);
        }
        
        return {
            occupiedDays: occupiedDays, 
            totalDays: totalDays
        };
    }
}

export class Booking {

    name: string;
    email: string;
    checkIn: string;
    checkOut: string;
    discount: number;
    room: Room;

    constructor(booking: iBooking) {
        this.name = booking.name;
        this.email = booking.email;
        this.checkIn = booking.checkIn;
        this.checkOut = booking.checkOut;
        this.discount = booking.discount;
        this.room = booking.room;
    }

    getFee(): number {
        //this.room.errorDiscount();
        //this.#errorDiscount();
        return Math.min(0, this.room.getTotalDays(new Date(this.checkIn), new Date(this.checkOut)).totalDays * Math.round(this.room.priceToCent() - (this.room.priceToCent() * this.discount / ONE_HUNDRED_PERCENTAGE)));
    }

    /*#errorDiscount() {
        if (isNaN(this.discount)) throw new Error('Invalid Discount Booking Format');
        if (this.discount > ONE_HUNDRED_PERCENTAGE) this.discount = ONE_HUNDRED_PERCENTAGE;
        if (this.discount < ZERO_PERCENTAGE) this.discount = ZERO_PERCENTAGE;
    }*/
}

const bookings: iBookingTemplateSecond[] = [
    {
        checkIn: '2024-01-01',
        checkOut: '2024-01-02',
        discount: 10    
    },
    {
        checkIn: '2024-01-02',
        checkOut: '2024-01-03',
        discount: 20    
    },
];
const room = classTemplate(bookings);
const room1 = classTemplate(bookings);

console.log(room);
console.log(room1);

console.log(room.isOccupied('2024-01-08'));
//