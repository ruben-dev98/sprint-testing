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

export interface iBookingTemplate {
    name: string,
    email: string,
}

export interface iBookingTemplateSecond {
    checkIn: string,
    checkOut: string,
    discount: number
}

export interface iBooking extends iBookingTemplate, iBookingTemplateSecond {
    room: Room
}

