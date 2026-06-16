import {expect, test} from '@playwright/test';

test('TC#001: POST - Create a new booking', async ({ request }) => {
    // Create a new booking
    const booking = await request.post('/booking');
    const payload = {
    "firstname" : "Jack",
    "lastname" : "Browner",
    "totalprice" : 121,
    "depositpaid" : true,
    "bookingdates" : {
        "checkin" : "2026-06-01",
        "checkout" : "2026-06-09"
    },
    "additionalneeds" : "Breakfast"
};
const responseData = await request.post('/booking', { data: payload });
    expect(responseData.status()).toBe(200);
    const responseBody = await responseData.json();
    expect(responseBody.booking).toMatchObject(payload);
    const data = await responseData.json();
    console.log('Created Booking:', data);
});
