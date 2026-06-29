import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

// Default test credentials (support/world does not export CREDS)
const CREDS = {
  standardUser: 'standard_user',
  password: 'secret_sauce',
};
import { LoginPage } from '../../pages/LoginPage';

Given("I am on the TTACart login page", async function (this: CustomWorld) {
  await this.loginPage.open();
});

When("I log in as the standard user", async function (this: CustomWorld) {
  await this.loginPage.loginAs(CREDS.standardUser, CREDS.password);
});

Then("the inventory page is displayed", async function (this: CustomWorld) {
  await this.inventoryPage.assertLoaded();
});