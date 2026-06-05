import {expect,Locator,Page} from '@playwright/test';
import {BasePage} from './BasePage';

export class CheckoutFinal extends BasePage {
    static readonly URL = "/playwright/ttacart/checkout-complete.html"  
    readonly backHome: Locator;
    readonly orderCompleteHeader: Locator;

    constructor(page: Page) {
    super(page);
    this.backHome = page.getByTestId("back-to-products");
    this.orderCompleteHeader = page.getByTestId("complete-header");
    }
    async backHomeClick(): Promise<void> {
    await this.element.click(this.backHome);
    await this.page.waitForLoadState('domcontentloaded');
  }
    async assertLoaded(id: string): Promise<void> {
    await this.goto(`${CheckoutFinal.URL}?id=${id}`);
    await expect(this.orderCompleteHeader).toBeVisible();
  } 
  async orderComplete(): Promise<string> {
    return this.element.getText(this.orderCompleteHeader);
  }
}