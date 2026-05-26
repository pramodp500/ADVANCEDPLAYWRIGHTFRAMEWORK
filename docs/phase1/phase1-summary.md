# Phase 1 — Project Setup

## Installed Dependencies

| Package | Type |
|---|---|
| `csv-parse` | runtime |
| `dotenv` | runtime |
| `xlsx` | runtime |
| `winston` | runtime |
| `typescript` | dev |
| `@playwright/test` | dev |
| `@types/node` | dev |
| `allure-playwright` | dev |
| `@faker-js/faker` | runtime |

## npm Scripts Added

| Script | Command |
|---|---|
| `test` | `playwright test` |
| `test:headed` | `playwright test --headed` |
| `test:ui` | `playwright test --ui` |
| `test:chromium` | `playwright test --project=chromium` |
| `test:firefox` | `playwright test --project=firefox` |
| `test:debug` | `playwright test --debug` |
| `test:e2e` | `playwright test --grep @e2e` |
| `test:p0` | `playwright test --grep @P0` |
| `test:report` | `npx allure generate ./allure-results --clean` |
| `test:LOR` | `playwright test --project=LOR` |
| `test:report-ci` | `playwright test --reporter=html` |
| `test:linting` | `npx eslint .` |
| `typecheck` | `npx tsc --noEmit` |
| `format` | `npx prettier --check .` |
| `build` | `npx tsc` |
| `clean` | `rimraf allure-results test-results` |
| `logger` | `node scripts/logger.js` |

## Files Created / Modified

- **`package.json`** — scripts, dependencies updated
- **`tsconfig.json`** — TypeScript config (ES2022, Node16 module)
- **`playwright.config.ts`** — browser projects, reporters, CI config
- **`src/utils/logger.ts`** — Winston logger with console + file transports
- **`src/utils/CustomReporter.ts`** — Custom HTML reporter for TTA
- **`scripts/logger.js`** — CLI logger entry point
- **`rule/test-quality-check.md`** — quality check documentation
- **`.github/copilot-instructions.md`** — GitHub Copilot rules

## Folder Structure

```
📦 AdvancedPlaywrightFramework
├── 📁 docs/phase1/          # Phase 1 documentation
├── 📁 rule/                 # Test quality rules
├── 📁 scripts/              # Utility scripts
├── 📁 src/
│   ├── 📁 pages/
│   ├── 📁 testdata/
│   ├── 📁 tests/            # Playwright test specs
│   └── 📁 utils/            # Logger, CustomReporter, etc.
├── 📁 .github/
│   ├── 📁 workflows/
│   └── copilot-instructions.md
├── playwright.config.ts
├── tsconfig.json
└── package.json
```
