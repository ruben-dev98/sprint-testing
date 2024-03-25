import { Room } from "./index"

export interface iDays {
    occupiedDays: number,
    totalDays: number
}

export interface iRoom {
    name: string,
    rate: number,
    discount: number
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

