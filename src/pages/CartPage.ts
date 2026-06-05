import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { InventoryPage } from './InventoryPage';

export class CartPage extends BasePage {
  static readonly URL = '/playwright/ttacart/cart';
  readonly addToCartTtaBolt: Locator;
  readonly addToCartTtaFleece: Locator;
  readonly addToCartTtaPractice: Locator;
  readonly shoppingCartContainerSvg: Locator;
  readonly continueShopping: Locator;
  readonly checkout: Locator;
  readonly subtitle: Locator;
  readonly cartItems: Locator;
  readonly itemNames: Locator;
  readonly itemDescriptions: Locator;
  readonly itemPrices: Locator;
  readonly itemQuantities: Locator;

  constructor(page: Page) {
    super(page);
    this.addToCartTtaBolt = page.getByTestId('add-to-cart-tta-bolt-tshirt');
    this.addToCartTtaFleece = page.getByTestId('add-to-cart-tta-fleece-jacket');
    this.addToCartTtaPractice = page.getByTestId('add-to-cart-tta-practice-backpack');
    this.shoppingCartContainerSvg = page.locator('#shopping_cart_container > svg');
    this.continueShopping = page.getByTestId('continue-shopping');
    this.checkout = page.getByTestId('checkout');
    this.subtitle = page.locator('[data-test="title"]');
    this.cartItems = page.getByTestId('inventory-item');
    this.itemNames = page.locator('[data-test="inventory-item-name"]');
    this.itemDescriptions = page.locator('[data-test="inventory-item-desc"]');
    this.itemPrices = page.locator('[data-test="inventory-item-price"]');
    this.itemQuantities = page.locator('[data-test="item-quantity"]');
  }

  async addItemsAndGoToCart(items: string[]): Promise<void> {
    this.log.info('Adding items to cart', { items });
    const inventory = new InventoryPage(this.page);
    await inventory.open();
    for (const item of items) {
      this.log.info(`Adding item: ${item}`);
      await inventory.addToCart(item);
    }
    await this.open();
  }

  private addBtn(id: string): Locator {
    return this.page.getByTestId(`add-to-cart-${id}`);
  }

  async addItemById(id: string): Promise<void> {
    await this.element.click(this.addBtn(id));
    await this.page.waitForLoadState('domcontentloaded');
  }

  async boltTshirt(): Promise<void> {
    await this.element.click(this.addToCartTtaBolt);
    await this.page.waitForLoadState('domcontentloaded');
  }
  async fleeceJacket(): Promise<void> {
    await this.element.click(this.addToCartTtaFleece);
    await this.page.waitForLoadState('domcontentloaded');
  }
  async practiceBackpack(): Promise<void> {
    await this.element.click(this.addToCartTtaPractice);
    await this.page.waitForLoadState('domcontentloaded');
  }
  async open(): Promise<void> {
    await this.goto(CartPage.URL);
    await this.assertLoaded();
  }
  async assertLoaded(): Promise<void> {
    await expect(this.subtitle).toHaveText('Your Cart');
  }
  async getItemCount(): Promise<number> {
    return this.element.count(this.cartItems);
  }
  async getItemNames(): Promise<string[]> {
    return this.element.getAllTexts(this.itemNames);
  }
  async getItemPrices(): Promise<string[]> {
    return this.element.getAllTexts(this.itemPrices);
  }
  async getItemQuantities(): Promise<string[]> {
    return this.element.getAllTexts(this.itemQuantities);
  }
  async cartopen(): Promise<void> {
    await this.element.click(this.shoppingCartContainerSvg);
    await this.page.waitForLoadState('domcontentloaded');
  }
  async continueShoppingClick(): Promise<void> {
    await this.element.click(this.continueShopping);
    await this.page.waitForLoadState('domcontentloaded');
  }
  async checkoutClick(): Promise<void> {
    await this.element.click(this.checkout);
    await this.page.waitForLoadState('domcontentloaded');
  }
}



