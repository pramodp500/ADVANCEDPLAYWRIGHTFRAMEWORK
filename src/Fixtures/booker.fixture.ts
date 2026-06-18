import {test as base, expect} from '@playwright/test';
import { BookingApi } from '../api/BookingApi';

export type BookerFixtures = {
    bookingApi: BookingApi;
    bookerToken: string;

};

export { expect } from '@playwright/test';

export const test = base.extend<BookerFixtures>({
    bookingApi: async ({request}, use) =>{
        await use (new BookingApi(request));

    },
    bookerToken: async ({bookingApi}, use) =>{
        const token = await bookingApi.auth();
        await use(token);
    },
});
