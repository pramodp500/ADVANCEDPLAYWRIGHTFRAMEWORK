import {expect, Locator, Page} from '@playwright/test';
import {BasePage} from './BasePage';
export class CheckoutPage extends BasePage {
    static readonly URL = "/playwright/ttacart/checkout-step-one.html"
  readonly firstname: Locator;
  readonly lastname: Locator;
  readonly postalcode: Locator;
  readonly continue: Locator;

  constructor(page: Page) {
 super(page);
    this.firstname = page.getByTestId("firstName");
    this.lastname = page.getByTestId("lastName");
    this.postalcode = page.getByTestId("postalCode");
    this.continue = page.getByTestId("continue");
  }
async fname(name: string): Promise<void> {
    await this.element.fill(this.firstname, name);
    await this.page.waitForLoadState('domcontentloaded');
  }
async lname(name: string): Promise<void> {
    await this.element.fill(this.lastname, name);
    await this.page.waitForLoadState('domcontentloaded');
  }
async postalcodefill(code: string): Promise<void> {
    await this.element.fill(this.postalcode, code);
    await this.page.waitForLoadState('domcontentloaded');
  }
  async continueClick(): Promise<void> {
    await this.element.click(this.continue);
    await this.page.waitForLoadState('domcontentloaded');
  }
    async assertLoaded(): Promise<void> {
    await expect(this.continue).toBeVisible();
  }
}
