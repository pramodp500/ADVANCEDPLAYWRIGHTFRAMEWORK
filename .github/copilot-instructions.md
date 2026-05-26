# Test Quality Rule

Every time a new test case is added, run the following checks before committing:

1. **TypeScript Type Check**: `npm run typecheck`
2. **Lint Check**: `npm run test:linting`

Quick command: `npm run typecheck && npm run test:linting`

## Pre-Commit Checklist

- [ ] New test follows existing naming conventions
- [ ] TypeScript compiles without errors
- [ ] No linting warnings or errors
- [ ] Test has been executed and passes
