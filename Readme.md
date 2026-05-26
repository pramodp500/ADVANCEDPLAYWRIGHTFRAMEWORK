# 🎭 Advanced Playwright Framework

A scalable test automation framework built with Playwright, TypeScript, and Winston logging.

## Tech Stack

- **Playwright** — cross-browser test execution
- **TypeScript** — type-safe test code
- **Winston** — structured logging
- **Allure** — test reporting
- **Faker** — test data generation
- **dotenv** — environment configuration
- **csv-parse / xlsx** — data-driven testing

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
├── pages/       # Page Object Models
├── testdata/    # Test data files
├── tests/       # Test specs
└── utils/       # Logger, CustomReporter, helpers
```

## Test Quality

Before committing new tests, run:

```bash
npm run typecheck && npm run test:linting
```

See `rule/test-quality-check.md` for details.

## Phase 1

Setup documentation and config snapshots are in `docs/phase1/`.
