import { expect, Locator, Page, test } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  static readonly URL = "https://app.thetestingacademy.com/playwright/ttacart/";
  readonly page: Page;
  readonly userNameInput: Locator;
  readonly passwordinput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.userNameInput = page.locator(`//input[@id='user-name']`);
    this.passwordinput = page.locator(`//input[@id='password']`);
    this.loginButton = page.getByText("Login");
  }

  async open(): Promise<void> {
    await this.goto(LoginPage.URL);
  }

  async loginAs(username: string, password: string): Promise<void> {
    this.log.info(`Logging in as: ${username}`);
    await test.step(`Fill username: ${username}`, async () => {
      await this.element.fill(this.userNameInput, username);
    });
    await test.step('Fill password', async () => {
      await this.element.fill(this.passwordinput, password);
    });
    await test.step('Click login button', async () => {
      await this.element.click(this.loginButton);
    });
  }
}
