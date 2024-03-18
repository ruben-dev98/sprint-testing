const {Room, Booking} = require('./index.js');

const roomTemplate = {name: 'Double Bed'};
const bookingTemplate = {name: 'Ruben D', email: 'ruben.dopico.dev@gmail.com'};

const room = new Room({...roomTemplate});
const room1 = new Room({...roomTemplate});
const room2 = new Room({...roomTemplate});
const room3 = new Room({...roomTemplate});
const booking1 = new Booking({...bookingTemplate}, '2024-01-01', '2024-01-02');
const booking2 = new Booking({...bookingTemplate}, '2024-01-02', '2024-01-03');
const booking3 = new Booking({...bookingTemplate}, '2024-01-03', '2024-01-04');
room.bookings = [booking1, booking2, booking3];
const aRooms = [room, room1, room2, room3];

test('Rooms is occupied', () => {
    expect(room.isOccupied('2024-01-02')).toBe(true);
});

test('Room occupancy percentage', () => {
    expect(room.occupancyPercentage('2024-01-02')).toBe(false);
});

test('Room total ocupancy percentage', () => {
    expect(Room.totalOccupancyPercentage(aRooms, '2024-01-01', '2024-02-01')).toBe(true);
});

test('Room available rooms', () => {
    expect(Room.availableRooms(aRooms, '2024-01-01', '2024-02-01')).toBe(true);
});

test('Booking get fee', () => { 
    expect(booking1.getFee()).toBe(true);
});