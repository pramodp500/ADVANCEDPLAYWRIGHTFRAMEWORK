import { World, IWorldOptions, setWorldConstructor } from "@cucumber/cucumber";
import type { Browser, BrowserContext, Page } from "@playwright/test";

import { LoginPage } from "../../pages/LoginPage";
import { InventoryPage } from "../../pages/InventoryPage";
import { CartPage } from "../../pages/CartPage";
import { CheckoutPage } from "../../pages/Checkout1";
import { Checkout2 } from "../../pages/Checkout2";
import { CheckoutFinal } from "../../pages/CheckoutFinal";

export const BASE_URL =
  process.env.BASE_URL ?? "https://app.thetestingacademy.com";

export const CREDS = {
  standardUser: process.env.STANDARD_USER ?? "standard_user",
  password: process.env.TTA_SECRET ?? "tta_secret",
} as const;

export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;

  loginPage!: LoginPage;
  inventoryPage!: InventoryPage;
  cartPage!: CartPage;
  checkoutStepOnePage!: CheckoutPage;
  checkoutStepTwoPage!: Checkout2;
  checkoutCompletePage!: CheckoutFinal;

  scratch: Record<string, unknown> = {};

  constructor(options: IWorldOptions) {
    super(options);
  }

  initPages(): void {
    this.loginPage = new LoginPage(this.page);
    this.inventoryPage = new InventoryPage(this.page);
    this.cartPage = new CartPage(this.page);
    this.checkoutStepOnePage = new CheckoutPage(this.page);
    this.checkoutStepTwoPage = new Checkout2(this.page);
    this.checkoutCompletePage = new CheckoutFinal(this.page);
  }
}

setWorldConstructor(CustomWorld);
