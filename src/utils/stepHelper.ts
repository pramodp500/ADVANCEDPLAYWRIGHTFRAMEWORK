import { test, type Page } from '@playwright/test';

let stepIndex = 0;

export async function step(page: Page, name: string, body: () => Promise<void>): Promise<void> {
    await test.step(name, async () => {
        await body();
        stepIndex++;
        await page.screenshot({
            fullPage: true,
        });
    });
}
