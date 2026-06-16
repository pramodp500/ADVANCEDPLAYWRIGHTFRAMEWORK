import {expect, test} from '@playwright/test';

test('TC#002: PUT - Update an existing booking', async ({ request }) => {
  // Create auth token
  const authResponse = await request.post('/auth', {
    data: { username: 'admin', password: 'password123' },
  });
  expect(authResponse.status()).toBe(200);
  const token = (await authResponse.json()).token;

  // Create a booking first
  const createPayload = {
    firstname: 'Jack',
    lastname: 'Browner',
    totalprice: 121,
    depositpaid: true,
    bookingdates: { checkin: '2026-06-01', checkout: '2026-06-09' },
    additionalneeds: 'Breakfast',
  };
  const createResponse = await request.post('/booking', { data: createPayload });
  expect(createResponse.status()).toBe(200);
  const bookingId = (await createResponse.json()).bookingid;

  // Update the booking
  const updatePayload = {
    firstname: 'Jane',
    lastname: 'Smith',
    totalprice: 150,
    depositpaid: true,
    bookingdates: { checkin: '2026-06-01', checkout: '2026-06-09' },
    additionalneeds: 'Breakfast',
  };
  const response = await request.put(`/booking/${bookingId}`, {
    data: updatePayload,
    headers: { cookie: `token=${token}` },
  });
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body).toMatchObject(updatePayload);
  console.log('Updated Booking:', body);
});