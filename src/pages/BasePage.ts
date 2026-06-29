import { type Locator, type Page } from '@playwright/test';
import { UtilElemetLocator, type Flex, DEFAULT_TIMEOUT } from '../utils/UtilElementsLocator';
import logger from '../utils/logger';

const BASE_URL =
  process.env.BASE_URL ?? 'https://app.thetestingacademy.com';

export abstract class BasePage {
  protected readonly page: Page;
  protected readonly element: UtilElemetLocator;
  protected readonly log = logger;

  constructor(page: Page) {
    this.page = page;
    this.element = new UtilElemetLocator(page);
  }

  protected async goto(url: string): Promise<void> {
    const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;
    this.log.info(`Navigating to: ${fullUrl}`);
    await this.page.goto(fullUrl);
    await this.page.waitForLoadState('domcontentloaded');
    this.log.info(`Successfully navigated to: ${fullUrl}`);
  }
}