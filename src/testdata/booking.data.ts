// dynamic import to avoid CommonJS/ESM interop issues
const fakerPromise = import('@faker-js/faker');
import type { Booking } from '../api/BookingApi';

async function isDate(daysFromNow: number): Promise<string> {
    const { faker } = await fakerPromise;
    const d = faker.date.soon({ days: daysFromNow, refDate: '2026-01-01T00:00:00.000Z' });
    return d.toISOString().slice(0, 10);
}

export async function futureDate(daysFromNow: number): Promise<string> {
    return isDate(daysFromNow);
}

export async function generateBooking(overrides?: Partial<Booking>): Promise<Booking> {
    const { faker } = await fakerPromise;
    return {
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        totalprice: faker.number.int({ min: 50, max: 500 }),
        depositpaid: faker.datatype.boolean(),
        bookingdates: {
            checkin: await futureDate(1),
            checkout: await futureDate(5),
        },
        additionalneeds: faker.helpers.arrayElement(['Breakfast', 'Parking', 'WiFi', undefined]),
        ...overrides,
    } as Booking;
}