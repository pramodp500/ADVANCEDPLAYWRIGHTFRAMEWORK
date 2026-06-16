import { test, expect } from '@playwright/test';
import { APIHelper } from '../../utils/APIHelper';
import logger from '../../utils/logger';

interface CreateBookingResponse {
    bookingid: number;
    booking: {
        firstname: string;
        lastname: string;
        totalprice: number;
        depositpaid: boolean;
        bookingdates: {
            checkin: string;
            checkout: string;
        };
        additionalneeds: string;
    };
}

const payload = {
    firstname: 'Jack',
    lastname: 'Browner',
    totalprice: 121,
    depositpaid: true,
    bookingdates: {
        checkin: '2026-06-01',
        checkout: '2026-06-09',
    },
    additionalneeds: 'Breakfast',
};

test.describe('@P0 @regression Level 2 (APIHelper) - Create Booking', () => {
    test('TC#001: POST - Create a new booking', async ({ request }) => {
        const api = new APIHelper(request);

        await test.step('Prepare booking payload', async () => {
            logger.info('Booking payload prepared', payload);
        });

        const response = await test.step('Send POST request to create booking', async () => {
            logger.info('Sending POST request to /booking');
            const res = await api.callApi({
                url: '/booking',
                method: 'POST',
                data: payload,
            });
            logger.info(`Response status: ${res.status()}`);
            return res;
        });

        await test.step('Validate response status is 200', async () => {
            expect(response.status()).toBe(200);
            logger.info('Response status validated successfully');
        });

        await test.step('Validate booking details match payload', async () => {
            const responseBody = await response.json() as CreateBookingResponse;
            expect(responseBody.booking).toMatchObject(payload);
            logger.info('Created Booking:', responseBody);
        });
    });
});