import { expect, test } from '../Fixtures/test-base';
import logger from '../utils/logger';
import { getConfig } from '../config';
import { step } from '../utils/stepHelper';

const { username, password } = getConfig();

test.describe('End-to-End Checkout Flow @e2e', () => {
    test.beforeEach(async ({ loginPage, page }) => {
        await step(page, 'Login with credentials from config', async () => {
            logger.info(`Logging in as ${username}`);
            await loginPage.open();
            await loginPage.loginAs(username, password);
        });
    });

    test('should complete full checkout flow', async ({ page, cartPage, checkout1, checkout2, checkoutFinal }) => {
        await step(page, 'Add item to cart and proceed to checkout', async () => {
            await cartPage.addItemById('tta-bolt-tshirt');
            await cartPage.cartopen();
            await cartPage.checkoutClick();
        });

        await step(page, 'Fill checkout information', async () => {
            await checkout1.fname('John');
            await checkout1.lname('Doe');
            await checkout1.postalcodefill('12345');
            await checkout1.continueClick();
        });

        await step(page, 'Finish checkout', async () => {
            await checkout2.finishClick();
        });

        await step(page, 'Verify order confirmation', async () => {
            const message = await checkoutFinal.orderComplete();
            expect(message).toContain('Thank you for your order!');
        });
    });
});
