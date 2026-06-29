import { Before, After, BeforeAll, AfterAll, ITestCaseHookParameter, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, type Browser, type BrowserContext, type Page } from '@playwright/test';
import { CustomWorld } from './world';

setDefaultTimeout(60000);

let browser: Browser;

BeforeAll(async function () {
  browser = await chromium.launch({ headless: true });
});

Before(async function (this: CustomWorld, _scenario: ITestCaseHookParameter) {
  const context: BrowserContext = await browser.newContext();
  this.page = await context.newPage();
  this.initPages();
});

After(async function (this: CustomWorld, _scenario: ITestCaseHookParameter) {
  if (this.page) {
    await this.page.context().close();
  }
});

AfterAll(async function () {
  if (browser) {
    await browser.close();
  }
});
