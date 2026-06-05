import {expect, Locator,Page} from '@playwright/test';
import {BasePage} from './BasePage';

export class ItemDetailPage extends BasePage {
    static readonly URL = "/playwright/ttacart/inventory-item.html";
  readonly page: Page;
  readonly backToProducts: Locator;
  readonly inventoryItemName: Locator;
  readonly inventoryItemPrice: Locator;
  readonly addToCart: Locator;
  readonly remove: Locator;

  constructor(page: Page) {
    super(page , 'ItemDetailPage');
    this.backToProducts = page.getByTestId("back-to-products");
    this.inventoryItemName = page.getByTestId("inventory-item-name");
    this.inventoryItemPrice = page.getByTestId("inventory-item-price");
    this.addToCart = page.getByTestId("add-to-cart");
    this.remove = page.getByTestId("remove");
  }
  async back(): Promise<void> {
    await this.element.click(this.backToProducts);
    await this.page.waitForLoadState('domcontentloaded');
  }
  async addToCart(): Promise<void> {
    await this.element.click(this.addToCart);
    await this.page.waitForLoadState('domcontentloaded');
  }
async removeFromCart(): Promise<void> {
    await this.element.click(this.remove);
    await this.page.waitForLoadState('domcontentloaded');
  }
  async price(): Promise<string> {
    return this.element.getText(this.inventoryItemPrice);
  }
    async name(): Promise<string> {
    return this.element.getText(this.inventoryItemName);
  }
  async assertLoaded(id: string): Promise<void> {
await this.goto(`${ItemDetailPage.URL}?id=${id}`);
await this.assertLoaded(id);
  }

}
