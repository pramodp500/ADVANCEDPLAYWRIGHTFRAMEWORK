import {  Locator, expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
    static readonly URL = "/playwright/ttacart/inventory";
  private readonly title: Locator;
  private readonly article: Locator;
  private readonly addToCartTestAllthethings: Locator;
  private readonly dropdown: Locator;
  private readonly itemprice: Locator;
  private readonly cartlink: Locator;
  private readonly items: Locator;
 private readonly itemNames: Locator;
  constructor(page: Page) {
    super(page);
    this.dropdown = page.getByRole("combobox", { name: "Sort products" });
    this.cartlink = page.locator("#shopping_cart_container > svg");
    this.items = page.getByTestId("inventory-item");
    this.itemNames = page.locator("[data-test='inventory-item-name']");
    this.itemprice = page.getByTestId("inventory-item-price");
    this.title = page.locator("[data-test='title']");
    this.article = page.getByRole("article");
    this.addToCartTestAllthethings = page.getByTestId("add-to-cart-test-allthethings-tshirt-red");
  }
  async open(): Promise<void> {
    await this.goto(InventoryPage.URL);
    await this.assertLoaded();
  }
  async assertLoaded(): Promise<void> {
    await expect(this.title).toHaveText("Products");
}

async productNames(): Promise<string[]> {
  return this.element.getAllTexts(this.itemNames);
}
private addBtn(id:string): Locator {
  return this.page.getByTestId(`add-to-cart-${id}`);
}
private removeBtn(id:string): Locator {
  return this.page.getByTestId(`remove-${id}`);
}
async addToCart(id:string): Promise<void> {
  await this.element.click(this.addBtn(id));
}
async removeFromCart(id:string): Promise<void> {
  await this.element.click(this.removeBtn(id));
}
async cartCount(): Promise<number> {
  await this.element.click(this.cartlink);
  await this.page.waitForLoadState('domcontentloaded');
}
async openItemDetail(id:string): Promise<void> {
  await this.element.click(this.page.getByTestId(`inventory-item-name-${id}`));
  await this.page.waitForLoadState('domcontentloaded');
}
}

