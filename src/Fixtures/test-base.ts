import {test as base, Page} from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';
import {InventoryPage} from '../pages/InventoryPage';
import {ItemDetailPage} from '../pages/ItemDetailPage';
import {CartPage} from '../pages/CartPage';
import {CheckoutPage as Checkout1} from '../pages/Checkout1';
import {Checkout2} from '../pages/Checkout2';
import {CheckoutFinal} from '../pages/CheckoutFinal';

export type TestFixtures = {
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
    cartPage: CartPage;
    checkout1: Checkout1;
    checkout2: Checkout2;
    checkoutFinal: CheckoutFinal;
    itemDetailPage: ItemDetailPage;
};

export const test = base.extend<TestFixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    inventoryPage: async ({ page }, use) => {
        const inventoryPage = new InventoryPage(page);
        await use(inventoryPage);
    },
    cartPage: async ({ page }, use) => {
        const cartPage = new CartPage(page);
        await use(cartPage);
    },
    checkout1: async ({ page }, use) => {
        const checkout1 = new Checkout1(page);
        await use(checkout1);
    },
    checkout2: async ({ page }, use) => {
        const checkout2 = new Checkout2(page);
        await use(checkout2);
    },
    checkoutFinal: async ({ page }, use) => {
        const checkoutFinal = new CheckoutFinal(page);
        await use(checkoutFinal);
    },
    itemDetailPage: async ({ page }, use) => {
        const itemDetailPage = new ItemDetailPage(page);
        await use(itemDetailPage);
    },
});
export {expect} from '@playwright/test';