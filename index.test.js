const { Room, Booking } = require('./index.js');

const bookingTemplate = {
    name: 'Ruben D',
    email: 'ruben.dopico.dev@gmail.com'
};


const room = new Room('Double Bed', 120, 20);
const bookingRoom = new Booking({ ...bookingTemplate }, '2024-01-01', '2024-01-02', 10);
const booking1Room = new Booking({ ...bookingTemplate }, '2024-01-02', '2024-01-03', 10);
room.bookings = [bookingRoom, booking1Room];

const room1 = new Room('Double Bed', 120, 20);
// bookingRoom.room = room1;
// booking1Room.room = room1;
room1.bookings = [bookingRoom, booking1Room];

const room2 = new Room('Double Bed', 120, 20);
// bookingRoom.room = room2;
// booking1Room.room = room2;
room2.bookings = [bookingRoom, booking1Room];

const aRooms = [room, room1, room2];

describe('Room', () => {

    describe('occupiedRoom', () => {

        test('Is occupied inside range', () => {
            expect(room.isOccupied('2024-01-02')).toBe(true);
        });

        test('Is occupied before range', () => {
            expect(room.isOccupied('2024-12-01')).toBe(false);
        });

        test('Is occupied after range', () => {
            expect(room.isOccupied('2024-02-01')).toBe(false);
        });

        test('Is occupied on checkout day but the room is available', () => {
            expect(room.isOccupied('2024-01-03')).toBe(false);
        });

        test('Is occupied receives a string that is not a date', () => {
            expect(() => room.isOccupied('Hola')).toThrow('Invalid Date');
        });

        test('Is occupied receives a string that is not a valid date', () => {
            expect(() => room.isOccupied('1598-235-201')).toThrow('Invalid Date');
        });

        test('Is occupied receives a number that is not a valid date', () => {
            expect(() => room.isOccupied(13)).toThrow('Invalid Format');
        });

        test('Is occupied receives a empty string', () => {
            expect(() => room.isOccupied('')).toThrow('Invalid Date');
        });
    })

    describe('occupancyPercentage', () => {

        test('Occupancy percentage that is 8 percent', () => {
            expect(room.occupancyPercentage('2024-01-02', '2024-01-15')).toBe(8);
        });

        test('Occupancy percentage that is 0 percent', () => {
            expect(room.occupancyPercentage('2024-01-05', '2024-01-15')).toBe(0);
        });

        test('Occupancy percentage that is 50 percent', () => {
            expect(room.occupancyPercentage('2024-01-01', '2024-01-05')).toBe(50);
        });

        test('Occupancy percentage that is 100 percent', () => {
            expect(room.occupancyPercentage('2024-01-01', '2024-01-03')).toBe(100);
        });

        test('Occupancy percentage receives and start date that is not a date', () => {
            expect(() => room.occupancyPercentage('Hola', '2024-01-03')).toThrow('Invalid Date');
        });

        test('Occupancy percentage receives and end date that is not a date', () => {
            expect(() => room.occupancyPercentage('2024-01-03', 'Hola')).toThrow('Invalid Date');
        });

        test('Occupancy percentage receives and start date that is not a date', () => {
            expect(() => room.occupancyPercentage(0, '2024-01-03')).toThrow('Invalid Format');
        });

        test('Occupancy percentage receives and end date that is not a string', () => {
            expect(() => room.occupancyPercentage('2024-01-03', 0)).toThrow('Invalid Format');
        });

        test('Occupancy percentage start date greater than end date', () => {
            expect(() => room.occupancyPercentage('2024-01-24', '2024-01-03')).toThrow('Start Date Greater Than End Date');
        });

    })

    describe('totalOccupancyPercentage', () => {

        test('Total ocupancy percentage is 100', () => {
            expect(Room.totalOccupancyPercentage(aRooms, '2024-01-01', '2024-01-03')).toBe(100);
        });

        test('Total ocupancy percentage is 50', () => {
            expect(Room.totalOccupancyPercentage(aRooms, '2024-01-01', '2024-01-05')).toBe(50);
        });

        test('Total ocupancy percentage is 8', () => {
            expect(Room.totalOccupancyPercentage(aRooms, '2024-01-02', '2024-01-15')).toBe(8);
        });

        test('Total ocupancy percentage is 0', () => {
            expect(Room.totalOccupancyPercentage(aRooms, '2024-01-08', '2024-01-15')).toBe(0);
        });

        test('Total ocupancy percentage Array is empty', () => {
            expect(() => Room.totalOccupancyPercentage([], '2024-01-02', '2024-01-15')).toThrow('Array is empty');
        });

        test('Total ocupancy percentage receives and start date that is not a date', () => {
            expect(() => room.occupancyPercentage('Hola', '2024-01-03')).toThrow('Invalid Date');
        });

        test('Total ocupancy percentage receives and end date that is not a date', () => {
            expect(() => room.occupancyPercentage('2024-01-03', 'Hola')).toThrow('Invalid Date');
        });

        test('Total ocupancy percentage receives and start date that is not a date', () => {
            expect(() => room.occupancyPercentage(0, '2024-01-03')).toThrow('Invalid Format');
        });

        test('Total ocupancy percentage receives and end date that is not a string', () => {
            expect(() => room.occupancyPercentage('2024-01-03', 0)).toThrow('Invalid Format');
        });

        test('Total ocupancy percentage start date greater than end date', () => {
            expect(() => room.occupancyPercentage('2024-01-24', '2024-01-03')).toThrow('Start Date Greater Than End Date');
        });
    })

    describe('availableRooms', () => {
        test('', () => {

            expect(Room.availableRooms(aRooms, '2024-01-01', '2024-02-01')).toEqual([]);

            expect(Room.availableRooms(aRooms, '2024-01-15', '2024-02-01')).toEqual(aRooms);
        });

        test('Total ocupancy percentage Array is empty', () => {
            expect(() => Room.totalOccupancyPercentage([], '2024-01-02', '2024-01-15')).toThrow('Array is empty');
        });

        test('Total ocupancy percentage receives and start date that is not a date', () => {
            expect(() => room.occupancyPercentage('Hola', '2024-01-03')).toThrow('Invalid Date');
        });

        test('Total ocupancy percentage receives and end date that is not a date', () => {
            expect(() => room.occupancyPercentage('2024-01-03', 'Hola')).toThrow('Invalid Date');
        });

        test('Total ocupancy percentage receives and start date that is not a date', () => {
            expect(() => room.occupancyPercentage(0, '2024-01-03')).toThrow('Invalid Format');
        });

        test('Total ocupancy percentage receives and end date that is not a string', () => {
            expect(() => room.occupancyPercentage('2024-01-03', 0)).toThrow('Invalid Format');
        });

        test('Total ocupancy percentage start date greater than end date', () => {
            expect(() => room.occupancyPercentage('2024-01-24', '2024-01-03')).toThrow('Start Date Greater Than End Date');
        });
    })

})

describe('Booking', () => {
    test('Booking get fee', () => {
        expect(booking1.getFee()).toBe(true);
    });
})