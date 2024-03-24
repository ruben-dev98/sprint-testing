import { Room, Booking } from "./index"

export interface iDays {
    occupiedDays: number,
    totalDays: number
}

export interface iRoom {
    name: string,
    rate: number,
    discount: number,
    bookings?: Booking[]
}

export interface iBooking {
    name: string,
    email: string,
    checkIn: string,
    checkOut: string,
    discount: number,
    room: Room
}

export interface iBookingTemplate {
    name: string,
    email: string,
}

export interface iBookingTemplateSecond {
    checkIn: string,
    checkOut: string,
    discount: number
}