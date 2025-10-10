# CI Status Checks Reference

This document provides a quick reference for the CI status checks required before merging to `main`.

## Required Checks

| Check Name | Purpose | Command to Run Locally | Typical Duration |
|------------|---------|------------------------|------------------|
| **Lint** | Validates code style and catches common errors | `pnpm lint` | ~10-30 seconds |
| **Build** | Ensures the project builds successfully | `pnpm build` | ~1-3 minutes |

## Running Checks Locally

Before pushing your changes, run these commands to catch issues early:

```bash
# Install dependencies (first time only)
pnpm install

# Run linting
pnpm lint

# Build the project
pnpm build
```

## Understanding Check Results

### ✅ Lint Check Passed
- All code follows ESLint rules
- No syntax errors detected
- Code style is consistent

### ❌ Lint Check Failed
Common causes:
- ESLint rule violations
- Unused variables or imports
- Missing dependencies in React hooks
- Inconsistent code formatting

**Fix:**
```bash
pnpm lint
# Review the output and fix reported issues
```

### ✅ Build Check Passed
- Project compiles successfully
- No TypeScript errors
- All imports resolve correctly
- Next.js build completes

### ❌ Build Check Failed
Common causes:
- TypeScript type errors
- Missing dependencies
- Invalid imports
- Configuration issues

**Fix:**
```bash
pnpm build
# Review the error output and fix reported issues
```

## GitHub Actions Workflow

The CI workflow runs automatically on:
- Every push to a pull request
- Every push to the `main` branch

**Workflow file:** `.github/workflows/ci.yml`

## Status Check Badge

You can see the status of the latest CI run in the Actions tab:
```
https://github.com/Bleackh/tanstack-excel-table/actions
```

## Bypassing Checks (Not Recommended)

Branch protection rules prevent merging if checks fail. This is intentional to maintain code quality.

**Do not:**
- Disable branch protection to bypass failing checks
- Force push to override checks
- Merge without waiting for checks to complete

**Instead:**
- Fix the failing checks locally
- Push the fixes to your PR
- Wait for checks to pass

## Troubleshooting

### Checks are taking too long
- Check the Actions tab for workflow status
- If a job is stuck, it may be waiting for resources
- Contact a maintainer if jobs are consistently slow

### Checks pass locally but fail in CI
Possible reasons:
- Different Node.js version
- Missing environment variables
- Network issues (e.g., fetching external resources)

**Solution:**
- Check workflow logs for specific errors
- Ensure `pnpm-lock.yaml` is up to date
- Verify all dependencies are listed in `package.json`

### Can't find workflow logs
1. Go to the repository on GitHub
2. Click the **Actions** tab
3. Find your PR or commit in the list
4. Click on the workflow run to see logs

## Adding New Checks

If you need to add more CI checks:

1. Edit `.github/workflows/ci.yml`
2. Add a new job similar to existing ones
3. Update this documentation
4. Update branch protection settings to require the new check

Example:
```yaml
test:
  name: Test
  runs-on: ubuntu-latest
  steps:
    # ... setup steps ...
    - name: Run tests
      run: pnpm test
```

## Getting Help

If you're stuck with failing checks:

1. Read the error messages carefully
2. Check workflow logs in the Actions tab
3. Run the same commands locally to reproduce
4. Ask for help in the PR comments
5. Reach out to maintainers

---

**Remember:** These checks are here to help maintain code quality. Take time to fix issues rather than trying to bypass them.
