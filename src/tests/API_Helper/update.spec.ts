import { test, expect } from '@playwright/test';
import { APIHelper } from '../../utils/APIHelper';
import logger from '../../utils/logger';

test.describe('API Helper - Update Booking', () => {
    test('TC#001: PUT - Update an existing booking', async ({ request }) => {
        const api = new APIHelper(request);

        const token = await test.step('Authenticate and get auth token', async () => {
            logger.info('Authenticating with admin credentials');
            const authResponse = await api.callApi({
                url: '/auth',
                method: 'POST',
                data: { username: 'admin', password: 'password123' },
            });
            expect(authResponse.status()).toBe(200);
            const token = (await authResponse.json()).token;
            logger.info('Auth token obtained successfully');
            return token;
        });

        const bookingId = await test.step('Create a booking to update', async () => {
            const createPayload = {
                firstname: 'Jack',
                lastname: 'Browner',
                totalprice: 121,
                depositpaid: true,
                bookingdates: { checkin: '2026-06-01', checkout: '2026-06-09' },
                additionalneeds: 'Breakfast',
            };
            logger.info('Creating booking with payload', createPayload);
            const createResponse = await api.callApi({
                url: '/booking',
                method: 'POST',
                data: createPayload,
            });
            expect(createResponse.status()).toBe(200);
            const bookingId = (await createResponse.json()).bookingid;
            logger.info(`Booking created with ID: ${bookingId}`);
            return bookingId;
        });

        await test.step('Update the existing booking', async () => {
            const updatePayload = {
                firstname: 'Jane',
                lastname: 'Smith',
                totalprice: 150,
                depositpaid: true,
                bookingdates: { checkin: '2026-06-01', checkout: '2026-06-09' },
                additionalneeds: 'Breakfast',
            };
            logger.info(`Updating booking ${bookingId} with payload`, updatePayload);
            const response = await api.callApi({
                url: `/booking/${bookingId}`,
                method: 'PUT',
                data: updatePayload,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Cookie': `token=${token}`,
                },
            });
            expect(response.status()).toBe(200);
            const body = await response.json();
            expect(body).toMatchObject(updatePayload);
            logger.info('Updated Booking:', body);
        });
    });
});
