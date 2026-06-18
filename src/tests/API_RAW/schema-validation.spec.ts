import {test, expect} from '@playwright/test';
import Ajv from 'ajv';
import createBookingSchema from '../../testdata/create-Booking.schema.json' assert {type: 'json'};
import {JSONPath} from 'jsonpath-plus';

const ajv = new Ajv();

test.describe('Schema Validation', () => {
    test('POST /booking response matches create-Booking schema', async ({request}) => {
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

        const response = await request.post('/booking', {data: payload});
        expect(response.status()).toBe(200);

        const body = await response.json();

        const validate = ajv.compile(createBookingSchema);
        const valid = validate(body);

        expect(valid).toBe(true);
        if (!valid) {
            console.log('Schema validation errors:', JSON.stringify(validate.errors, null, 2));
        }

        const firstnames = JSONPath({path: '$.booking.firstname', json: body});
        expect(firstnames[0]).toBe('Jack');
    });
});
