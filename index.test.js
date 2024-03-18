const { Room, Booking } = require('./index.js');

const roomTemplate = { 
    name: 'Double Bed', 
    rate: 120, 
    discount: 20 
};

const bookingTemplate = { 
    name: 'Ruben D', 
    email: 'ruben.dopico.dev@gmail.com'
};

const room = new Room({ ...roomTemplate });

const booking1 = new Booking({ ...bookingTemplate }, '2024-01-01', '2024-01-02', 10);
const booking2 = new Booking({ ...bookingTemplate }, '2024-01-02', '2024-01-03', 10);
room.bookings = [booking1, booking2];

describe('Room', () => {

    describe('occupiedRoom', () => {

        test('Room is occupied is inside range', () => {
            expect(room.isOccupied('2024-01-02')).toBe(true);
        });

        test('Room is occupied is before range', () => {
            expect(room.isOccupied('2024-12-01')).toBe(false);
        });

        test('Room is occupied is after range', () => {
            expect(room.isOccupied('2024-02-01')).toBe(false);
        });

        test('Room is occupied is on checkout day but the rooms is available', () => {
            expect(room.isOccupied('2024-01-03')).toBe(false);
        });

        test('Room is occupied receives a string that is not a date', () => {
            expect(() => room.isOccupied('Hola')).toThrow('Invalid Date');
        });

        test('Room is occupied receives a string that is not a valid date', () => {
            expect(() => room.isOccupied('1598-235-201')).toThrow('Invalid Date');
        });

        test('Room is occupied receives a number that is not a valid date', () => {
            expect(() => room.isOccupied(13)).toThrow('Invalid Format');
        });

        test('Room is occupied receives a empty string', () => {
            expect(() => room.isOccupied('')).toThrow('Invalid Date');
        });
    })

    describe('occupancyPercentage', () => {

        test('Room occupancy percentage', () => {
            expect(room.occupancyPercentage('2024-01-02', '2024-01-15')).toBe(2);
        });

    })

    describe('totalOccupancyPercentage', () => {
        test('Room total ocupancy percentage', () => {
            expect(Room.totalOccupancyPercentage(aRooms, '2024-01-01', '2024-02-01')).toBe(true);
        });
    })

    describe('availableRooms', () => {
        test('Room available rooms', () => {
            expect(Room.availableRooms(aRooms, '2024-01-01', '2024-02-01')).toBe(true);
        });
    })

})


describe('Booking', () => {
    test('Booking get fee', () => {
        expect(booking1.getFee()).toBe(true);
    });
})