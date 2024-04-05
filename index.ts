import { iBooking, iDays, iRoom } from "./interface";

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
        if (isNaN(Date.parse(date))) throw new Error('Invalid Date');

        const date_parse: number = new Date(date).getTime();

        return this.bookings.some(booking => {
            const checkIn: number = new Date(booking.checkIn).getTime();
            const checkOut: number = new Date(booking.checkOut).getTime();
            return checkIn <= date_parse && checkOut > date_parse;
        });
    }

    occupancyPercentage(startDate: string, endDate: string): number {
        if (isNaN(Date.parse(startDate)) || isNaN(Date.parse(endDate))) throw new Error('Invalid Date');

        if (startDate > endDate) throw new Error('Start Date Greater Than End Date')

        const start: Date = new Date(startDate);
        const end: Date = new Date(endDate);
        const numberOfDates: iDays = this.getTotalDays(start, end);

        return Math.round((numberOfDates.occupiedDays / numberOfDates.totalDays * ONE_HUNDRED_PERCENTAGE));
    }

    priceToCent(): number {
        if (isNaN(this.rate)) throw new Error('Invalid Rate Room Format')
        return (this.rate - ((this.rate * this.discount) / ONE_HUNDRED_PERCENTAGE)) * CENTS;
    }

    static totalOccupancyPercentage(rooms: Room[], startDate: string, endDate: string): number {
        if (rooms.length === 0) throw new Error('Array is empty');

        let totalPercentage: number = INIT_TOTAL_OCCUPANCY_PERCENTAGE;
        rooms.forEach(room => {
            totalPercentage += room.occupancyPercentage(startDate, endDate);
        });

        return Math.round(totalPercentage);
    }

    static availableRooms(rooms: Room[], startDate: string, endDate: string): Room[] {
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
        this.name = booking.name || '';
        this.email = booking.email || '';
        this.checkIn = booking.checkIn || '';
        this.checkOut = booking.checkOut || '';
        this.discount = booking.discount || 0;
        this.room = booking.room;
    }

    getFee(): number {
        return this.room.getTotalDays(new Date(this.checkIn), new Date(this.checkOut)).totalDays * Math.round(this.room.priceToCent() - (this.room.priceToCent() * this.discount / ONE_HUNDRED_PERCENTAGE));
    }
}