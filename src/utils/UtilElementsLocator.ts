import { expect, Locator, Page } from '@playwright/test';
import logger from './logger';
import { Logger } from 'winston';

export const DEFAULT_TIMEOUT = 5000;
export type Flex = string | Locator;

export class UtilElemetLocator {
    private readonly page: Page;
    private readonly log: Logger;

    constructor(page: Page, scope: string = 'UtilElementLocator') {
        this.page = page;
        this.log = logger;
    }

    private toLocator(flex: Flex): Locator {
        return typeof flex === 'string' ? this.page.locator(flex) : flex;
    }

    // ------------ Actions ------------
    async click(target: Flex, timeout: number = DEFAULT_TIMEOUT): Promise<void> {
        logger.debug(`Clicking element: ${target}`);
        const locator = this.toLocator(target);
        await locator.click({ timeout });
    }
    async doubleClick(target: Flex, timeout: number = DEFAULT_TIMEOUT): Promise<void> {
        logger.debug(`Double-clicking element: ${target}`);
        const locator = this.toLocator(target);
        await locator.dblclick({ timeout });
    }
    async rightClick(target: Flex, timeout: number = DEFAULT_TIMEOUT): Promise<void> {
        logger.debug(`Right-clicking element: ${target}`);
        const locator = this.toLocator(target);
        await locator.click({ button: 'right', timeout });
    }
    async hover(target: Flex, timeout: number = DEFAULT_TIMEOUT): Promise<void> {
        logger.debug(`Hovering over element: ${target}`);
        const locator = this.toLocator(target);
        await locator.hover({ timeout });
    }
    async fill(target: Flex, value: string, timeout: number = DEFAULT_TIMEOUT): Promise<void> {
        logger.debug(`Filling element: ${target} with value: ${value}`);
        const locator = this.toLocator(target);
        await locator.fill(value, { timeout });
    }
    async type(target: Flex, value: string, timeout: number = DEFAULT_TIMEOUT): Promise<void> {
        logger.debug(`Typing into element: ${target} with value: ${value}`);
        const locator = this.toLocator(target);
        await locator.pressSequentially(value, { timeout });
    }
    async clear(target: Flex, timeout: number = DEFAULT_TIMEOUT): Promise<void> {
        logger.debug(`Clearing element: ${target}`);
        const locator = this.toLocator(target);
        await locator.clear({ timeout });
    }
    async pressSequentially(target: Flex, value: string, timeout: number = DEFAULT_TIMEOUT): Promise<void> {
        logger.debug(`Pressing sequentially on element: ${target} with value: ${value}`);
        const locator = this.toLocator(target);
        await locator.pressSequentially(value, { timeout });
    }

    // ------------ Getters ------------
    async getText(target: Flex, timeout: number = DEFAULT_TIMEOUT): Promise<string> {
        const locator = this.toLocator(target);
        return await locator.textContent({ timeout }) || '';
    }
    async getInnerText(target: Flex, timeout: number = DEFAULT_TIMEOUT): Promise<string> {
        const locator = this.toLocator(target);
        return await locator.innerText({ timeout }) || '';
    }
    async getValue(target: Flex): Promise<string | null> {
        const locator = this.toLocator(target);
        return locator.inputValue();
    }
    async getAttribute(target: Flex, name: string): Promise<string | null> {
        const locator = this.toLocator(target);
        return locator.getAttribute(name);
    }
    async count(target: Flex): Promise<number> {
        const locator = this.toLocator(target);
        return locator.count();
    }

    // ------------ State Checks ------------
    async isVisible(target: Flex): Promise<boolean> {
        const locator = this.toLocator(target);
        return await locator.isVisible();
    }
    async isEnabled(target: Flex): Promise<boolean> {
        const locator = this.toLocator(target);
        return await locator.isEnabled();
    }
    async isChecked(target: Flex): Promise<boolean> {
        const locator = this.toLocator(target);
        return await locator.isChecked();
    }

    // ------------ Waits ------------
    async waitForVisible(target: Flex, timeout: number = DEFAULT_TIMEOUT): Promise<void> {
        const locator = this.toLocator(target);
        await expect(locator).toBeVisible({ timeout });
    }
    async waitForHidden(target: Flex, timeout: number = DEFAULT_TIMEOUT): Promise<void> {
        const locator = this.toLocator(target);
        await expect(locator).toBeHidden({ timeout });
    }
    async waitForEnabled(target: Flex, timeout: number = DEFAULT_TIMEOUT): Promise<void> {
        const locator = this.toLocator(target);
        await expect(locator).toBeEnabled({ timeout });
    }
    async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForLoadState('networkidle').catch(() => {});
    }
}