import {expect,Locator,Page} from '@playwright/test';
import {BasePage} from './BasePage';
import { CartPage } from './CartPage';

export class Checkout2 extends BasePage {
    static readonly URL = "/playwright/ttacart/checkout-step-two.html";
  readonly finishbtn: Locator;
    constructor(page: Page) {
    super(page);
    this.finishbtn = page.getByTestId("finish");
    }
    async finishClick(): Promise<void> {
    await this.element.click(this.finishbtn);
    await this.page.waitForLoadState('domcontentloaded');
  }
    async assertLoaded(): Promise<void> {
    await expect(this.finishbtn).toBeVisible();
  }
}