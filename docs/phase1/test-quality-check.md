# Test Quality Check

Every time a new test case is added, run the following checks before committing:

## 1. TypeScript Type Check

```bash
npm run typecheck
```

Verifies type correctness across all test files.

## 2. Lint Check

```bash
npm run test:linting
```

Ensures code style and best practices.

## Quick Command

```bash
npm run typecheck && npm run test:linting
```

## Pre-Commit Checklist

- [ ] New test follows existing naming conventions
- [ ] TypeScript compiles without errors
- [ ] No linting warnings or errors
- [ ] Test has been executed and passes
