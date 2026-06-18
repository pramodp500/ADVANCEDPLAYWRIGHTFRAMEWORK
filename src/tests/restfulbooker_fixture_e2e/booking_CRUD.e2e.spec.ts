import logger from '../../utils/logger';
import { test, expect } from '../../Fixtures/booker.fixture';
import { generateBooking } from '../../testdata/booking.data';

test.describe.serial('e2e @P0 Level 3 - Booking lifecycle (token from fixtures)', () => {
    let bookingId: number;

    test("create booking", async ({bookingApi}) => {
        await test.step('generate booking payload', async () => {
            logger.info('Generating booking payload with overrides');
        });
        const payload = await generateBooking({firstname: 'E2E', lastname: 'Journey'});

        await test.step('POST /booking', async () => {
            logger.info('Creating booking via API');
        });
        const {bookingid, booking} = await bookingApi.createBooking(payload);

        await test.step('assert booking creation', async () => {
            logger.info(`Booking created with id=${bookingid}, name=${booking.firstname}`);
            expect(bookingid).toBeGreaterThan(0);
            expect(booking.firstname).toBe('E2E');
        });
        bookingId = bookingid;
    });

    test('update the booking (token comes from fixtures)', async ({bookingApi, bookerToken}) => {
        await test.step('PUT /booking', async () => {
            logger.info(`Updating booking ${bookingId}`);
        });
        const updated = await bookingApi.updateBooking(
            bookingId,
            await generateBooking({ firstname: 'E2E', lastname: 'Updated', totalprice: 950 }),
            bookerToken,
        );

        await test.step('assert update', async () => {
            logger.info(`Updated booking: lastname=${updated.lastname}, totalprice=${updated.totalprice}`);
            expect(updated.lastname).toBe('Updated');
            expect(updated.totalprice).toBe(950);
        });
    });

    test('delete the booking and confirm it is gone', async ({ bookingApi, bookerToken }) => {
        await test.step('DELETE /booking', async () => {
            logger.info(`Deleting booking ${bookingId}`);
        });
        const status = await bookingApi.deleteBooking(bookingId, bookerToken);
        expect(status).toBe(201);

        await test.step('GET /booking (confirm 404)', async () => {
            logger.info(`Verifying booking ${bookingId} returns 404`);
            const ghost = await bookingApi.getBookingResponse(bookingId);
            expect(ghost.status()).toBe(404);
        });
    });
});