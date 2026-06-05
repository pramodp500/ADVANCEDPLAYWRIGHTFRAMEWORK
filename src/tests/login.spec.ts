import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import logger from '../utils/logger';
import { step } from '../utils/stepHelper';

test.describe('TTA CArt - Login Tests @smoke', () => {
    let loginPage: LoginPage;
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await step(page, 'Open login page', async () => {
            logger.info('Opening login page');
            await loginPage.open();
        });
    });

    test('should login with valid credentials', async ({ page }) => {
        logger.info('Starting login test with valid credentials');
        await step(page, 'Enter credentials', async () => {
            await loginPage.loginAs('standard_user', 'tta_secret');
        });

        await step(page, 'Verify redirect to inventory', async () => {
            logger.info('Verifying redirect to inventory page');
            await expect(page).toHaveURL(/inventory/);
        });
    });
});