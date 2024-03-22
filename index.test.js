const { classTemplate } = require('./functionHelpers.js');



describe('Room', () => {

    describe('occupiedRoom', () => {
        const bookings = [
            {
                checkIn: '2024-01-01',
                checkOut: '2024-01-02',
                discount: 10    
            },
            {
                checkIn: '2024-01-02',
                checkOut: '2024-01-03',
                discount: 10    
            },
        ];
        const room = classTemplate(bookings);
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
    });

    describe('occupancyPercentage', () => {
        const bookings = [
            {
                checkIn: '2024-01-01',
                checkOut: '2024-01-02',
                discount: 10    
            },
            {
                checkIn: '2024-01-02',
                checkOut: '2024-01-03',
                discount: 10    
            },
        ];
        const room = classTemplate(bookings);
        test('Occupancy percentage that is 0 percent', () => {
            expect(room.occupancyPercentage('2024-01-05', '2024-01-15')).toBe(0);
        });

        test('Occupancy percentage that is 51 percent', () => {
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

    });

    describe('totalOccupancyPercentage', () => {

        test('Total ocupancy percentage is 100', () => {
            expect(Room.totalOccupancyPercentage(aRooms, '2024-01-01', '2024-01-06')).toBe(100);
        });

        test('Total ocupancy percentage is 50', () => {
            expect(Room.totalOccupancyPercentage(aRooms, '2024-01-01', '2024-01-13')).toBe(51);
        });

        test('Total ocupancy percentage is 0', () => {
            expect(Room.totalOccupancyPercentage(aRooms, '2024-01-08', '2024-01-15')).toBe(0);
        });

        test('Total ocupancy percentage Array is empty', () => {
            expect(() => Room.totalOccupancyPercentage([], '2024-01-02', '2024-01-15')).toThrow('Array is empty');
        });

        test('Total ocupancy percentage Array is not an array', () => {
            expect(() => Room.totalOccupancyPercentage('Hola', '2024-01-02', '2024-01-15')).toThrow('Not an Array');
        });

        // test('Total ocupancy percentage receives an start date that is not a date', () => {
        //     expect(() => room.occupancyPercentage('Hola', '2024-01-03')).toThrow('Invalid Date');
        // });

        // test('Total ocupancy percentage receives an end date that is not a date', () => {
        //     expect(() => room.occupancyPercentage('2024-01-03', 'Hola')).toThrow('Invalid Date');
        // });

        // test('Total ocupancy percentage receives an start date that is not a date', () => {
        //     expect(() => room.occupancyPercentage(0, '2024-01-03')).toThrow('Invalid Format');
        // });

        // test('Total ocupancy percentage receives an end date that is not a string', () => {
        //     expect(() => room.occupancyPercentage('2024-01-03', 0)).toThrow('Invalid Format');
        // });

        // test('Total ocupancy percentage start date greater than end date', () => {
        //     expect(() => room.occupancyPercentage('2024-01-24', '2024-01-03')).toThrow('Start Date Greater Than End Date');
        // });
    });

    describe('availableRooms', () => {

        test('Available rooms returns all rooms', () => {
            expect(Room.availableRooms(aRooms, '2024-01-15', '2024-02-01')).toMatchObject(aRooms);
        });

        test('Available rooms contains an especific room', () => {
            expect(Room.availableRooms(aRooms, '2024-01-15', '2024-02-01')).toContainEqual(room);
        });

        test('Available rooms returns an empty array', () => {
            expect(Room.availableRooms(aRooms, '2024-01-01', '2024-02-01')).toMatchObject([]);
        });

        test('Available rooms Array is empty', () => {
            expect(() => Room.availableRooms([], '2024-01-02', '2024-01-15')).toThrow('Array is empty');
        });

        test('Available rooms Array is not an array', () => {
            expect(() => Room.totalOccupancyPercentage('Hola', '2024-01-02', '2024-01-15')).toThrow('Not an Array');
        });

        // test('Available rooms receives and start date that is not a date', () => {
        //     expect(() => Room.availableRooms(aRooms, 'Hola', '2024-01-03')).toThrow('Invalid Date');
        // });

        // test('Available rooms receives and end date that is not a date', () => {
        //     expect(() => Room.availableRooms(aRooms, '2024-01-03', 'Hola')).toThrow('Invalid Date');
        // });

        // test('Available rooms receives and start date that is not a date', () => {
        //     expect(() => Room.availableRooms(aRooms, 0, '2024-01-03')).toThrow('Invalid Format');
        // });

        // test('Available rooms receives and end date that is not a string', () => {
        //     expect(() => Room.availableRooms(aRooms, '2024-01-03', 0)).toThrow('Invalid Format');
        // });

        // test('Available rooms start date greater than end date', () => {
        //     expect(() => Room.availableRooms(aRooms, '2024-01-24', '2024-01-03')).toThrow('Start Date Greater Than End Date');
        // });
    });
});

describe('Booking', () => {
    const bookings = [
        {
            checkIn: '2024-01-01',
            checkOut: '2024-01-02',
            discount: 10    
        },
        {
            checkIn: '2024-01-02',
            checkOut: '2024-01-03',
            discount: 10    
        },
    ];
    const room = classTemplate(bookings);
    const booking = room.bookings[0];

    describe('getFee', () => {
        test('Get fee room rate is not a number', () => {
            room.rate = 'Hola';
            expect(() => bookingRoom.getFee()).toThrow('Invalid Rate Room Format');
        });

        test('Get fee room discount is not a number', () => {
            room.discount = 'Hola';
            expect(() => bookingRoom.getFee()).toThrow('Invalid Discount Room Format');
        });

        test('Get fee booking discount is not a number', () => {
            booking.discount = 'Hola';
            room.discount = 20;
            room.rate = 120;
            expect(() => booking.getFee()).toThrow('Invalid Discount Booking Format');
        });

        test('Get fee result is 12000', () => {
            room.discount = -10;
            booking.discount = -10;
            expect(booking.getFee()).toBe(12000);
        });

        test('Get fee result is 0', () => {
            room.discount = 150;
            booking.discount = 150;
            expect(booking.getFee()).toBe(0);
        });
    });
});