# 🎭 Advanced Playwright Framework — TTA Cart

A scalable test automation framework for [The Testing Academy](https://thetestingacademy.com) TTA Cart application, built with Playwright, TypeScript, and Winston logging.

## Tech Stack

- **Playwright** — cross-browser test execution (Chromium, Firefox, WebKit, mobile)
- **TypeScript** — type-safe test code with strict mode
- **Winston** — structured logging (console + file transports)
- **@faker-js/faker** — test data generation
- **CustomTTAReporter** — real-time HTML reporting with step-by-step breakdown
- **dotenv** — environment configuration
- **csv-parse / xlsx** — data-driven testing
- **Allure** — optional rich reporting

## Quick Start

```bash
npm install
npm test
```

## npm Scripts

| Script | Description |
|---|---|
| `npm test` | Run all tests headless |
| `npm run test:headed` | Run tests with browser UI |
| `npm run test:ui` | Open Playwright UI mode |
| `npm run test:chromium` | Run Chromium only |
| `npm run test:firefox` | Run Firefox only |
| `npm run test:debug` | Run in debug mode |
| `npm run test:e2e` | Run @e2e tagged tests |
| `npm run test:p0` | Run @P0 priority tests |
| `npm run typecheck` | TypeScript type check |
| `npm run test:linting` | ESLint check |
| `npm run logger` | Run logger utility |

## Project Structure

```
src/
├── pages/                    # Page Object Models
│   ├── BasePage.ts           # Abstract base with element helpers & logger
│   ├── LoginPage.ts          # Login flow
│   ├── Inventory.ts          # Product listing
│   ├── ItemDetailPage.ts     # Product details
│   ├── Cart.ts               # Shopping cart
│   ├── Checkout1.ts          # Checkout — personal info
│   ├── Checkout2.ts          # Checkout — payment / overview
│   └── CheckoutFinal.ts      # Order confirmation
├── tests/                    # Test specs
│   ├── login.spec.ts         # Login test with test.step() granularity
│   └── example.spec.ts       # Playwright intro example
├── utils/
│   ├── logger.ts             # Winston logger (console + file)
│   ├── CustomReporter.ts     # Real-time HTML report generator
│   ├── UtilElementsLocator.ts # Unified element interaction layer
│   └── DataGenerators.ts     # Faker-based test data factories
├── testdata/                 # External test data (CSV, XLSX)
```

## Page Objects & BasePage

All page objects extend `BasePage`, which provides:

- **`this.element`** — `UtilElemetLocator` instance for unified element interactions (click, fill, hover, getText, waitForVisible, etc.)
- **`this.log`** — Winston logger scoped to the page
- **`this.goto(url)`** — Navigate and wait for DOM content loaded

### Example: LoginPage

```typescript
export class LoginPage extends BasePage {
  async loginAs(username: string, password: string): Promise<void> {
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
```

## Element Interactions

`UtilElemetLocator` accepts both CSS/XPath strings and `Locator` objects via the `Flex` type:

| Category | Methods |
|---|---|
| **Actions** | `click`, `doubleClick`, `rightClick`, `hover`, `fill`, `type`, `clear`, `pressSequentially` |
| **Getters** | `getText`, `getInnerText`, `getValue`, `getAttribute`, `count` |
| **State** | `isVisible`, `isEnabled`, `isChecked` |
| **Waits** | `waitForVisible`, `waitForHidden`, `waitForEnabled`, `waitForPageLoad` |

Each action is logged at `debug` level with the target selector.

## Test Data Generation

`DataGenerators.ts` uses `@faker-js/faker` to produce:

- `generateUserData()` — random username / password
- `generatePersonalInfo()` — name, email, phone
- `generateAddress()` — full address
- `generatePaymentData()` — credit card details
- `generateCheckoutData()` — complete checkout bundle
- `STATIC_USERS` — known test accounts (`standard_user`, `locked_out_user`, etc.)

All generators are async (handles ESM ↔ CJS `@faker-js/faker` import).

## Writing a Test

Use `test.step()` to create named steps in the custom HTML report:

```typescript
test('should login with valid credentials', async ({ page }) => {
  await test.step('Enter credentials', async () => {
    await loginPage.loginAs('standard_user', 'tta_secret');
  });
  await test.step('Verify redirect to inventory', async () => {
    await expect(page).toHaveURL(/inventory/);
  });
});
```

## Reporting

The `CustomTTAReporter` generates a live-updating HTML report in `tta-report/`:

- Real-time progress as tests execute
- Step-by-step breakdown with timing
- Screenshots, video, and trace attachments
- Console log association per step
- Test history page

## Logging

Winston logger writes to:

- **Console** — colorized, formatted output
- **`logs/error.log`** — error-level only
- **`logs/combined.log`** — all levels

```bash
LOG_LEVEL=debug npm test    # Enable debug logging
```

## Test Quality

Before committing, run:

```bash
npm run typecheck
```

See `rule/test-quality-check.md` for coding standards.

## Phase 1

Setup documentation and config snapshots are in `docs/phase1/`.
