const {Room, Booking} = require('./index.js');

const roomTemplate = {name: 'Double Bed'};
const bookingTemplate = {name: 'Ruben D', email: 'ruben.dopico.dev@gmail.com'};

const room = new Room({...roomTemplate}, 2, 90);

const room1 = new Room({...roomTemplate}, 4, 1);

const room2 = new Room({...roomTemplate}, 5, 10);

const room3 = new Room({...roomTemplate}, 3, 20);

const booking1 = new Booking({...bookingTemplate}, '2024-01-01', '2024-01-02', 10);
const booking2 = new Booking({...bookingTemplate}, '2024-01-02', '2024-01-03', 10);
const booking3 = new Booking({...bookingTemplate}, '2024-01-03', '2024-01-04', 10);

room.bookings = [booking1, booking2, booking3];
const aRooms = [room, room1, room2, room3];

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
            expect(room.isOccupied('2024-01-04')).toBe(false);
        });
        
        test('Room is occupied receives a string that is not a date', () => {
            expect(room.isOccupied('Hola')).toThrow(Error('Invalid Date'));
        });
    })

    describe('occupancyPercentage', () => {
        
        test('Room occupancy percentage', () => {
            expect(room.occupancyPercentage('2024-01-02')).toBe(false);
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