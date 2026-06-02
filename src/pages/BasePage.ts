import { type Locator, type Page } from '@playwright/test';
import { UtilElemetLocator, type Flex, DEFAULT_TIMEOUT } from '../utils/UtilElementsLocator';
import logger from '../utils/logger';

export abstract class BasePage {
  protected readonly page: Page;
  protected readonly element: UtilElemetLocator;
  protected readonly log = logger;

  constructor(page: Page) {
    this.page = page;
    this.element = new UtilElemetLocator(page);
  }

  protected async goto(url: string): Promise<void> {
    this.log.info(`Navigating to: ${url}`);
    await this.page.goto(url);
    await this.page.waitForLoadState('domcontentloaded');
    this.log.info(`Successfully navigated to: ${url}`);
  }
}