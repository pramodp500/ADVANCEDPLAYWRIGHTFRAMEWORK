import {test, expect} from '@playwright/test';

test('Basic Ping Test', async ({ request }) => {
  const response = await request.get('/ping');
  expect(response.status()).toEqual(201);
  expect(await response.text()).toEqual('Created');
});
