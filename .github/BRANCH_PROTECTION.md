# Branch Protection Settings

This document outlines the recommended branch protection settings for the `main` branch to ensure code quality and prevent accidental changes.

## Required Status Checks

The following GitHub Actions workflows must pass before merging:

- **Lint**: Ensures code follows ESLint rules
- **Build**: Verifies the project builds successfully

## Branch Protection Rules

To protect the `main` branch, the following settings should be enabled in GitHub repository settings:

### 1. Access Repository Settings

1. Go to the repository on GitHub
2. Click on **Settings** tab
3. Click on **Branches** in the left sidebar
4. Click **Add branch protection rule** or edit existing rule

### 2. Configure Protection Rules

**Branch name pattern:** `main`

**Protect matching branches:**

- ✅ **Require a pull request before merging**
  - ✅ Require approvals: 1 (recommended)
  - ✅ Dismiss stale pull request approvals when new commits are pushed
  - ✅ Require review from Code Owners (if CODEOWNERS file exists)

- ✅ **Require status checks to pass before merging**
  - ✅ Require branches to be up to date before merging
  - Required status checks:
    - `Lint`
    - `Build`

- ✅ **Require conversation resolution before merging**
  - Ensures all PR comments are resolved before merging

- ✅ **Do not allow bypassing the above settings**
  - Enforces rules for administrators as well

- ✅ **Restrict who can push to matching branches**
  - Only allow specific users/teams to push directly (optional)

- ✅ **Rules applied to everyone including administrators**
  - Ensures consistent protection for all users

### 3. Additional Protection Settings

- ✅ **Allow force pushes: Disabled**
  - Prevents force pushing to the main branch

- ✅ **Allow deletions: Disabled**
  - Prevents accidental deletion of the main branch

## Setting Up Branch Protection (Manual Steps)

Since branch protection rules can only be configured through the GitHub web interface or API, follow these steps:

1. **Navigate to Branch Protection Settings:**
   ```
   https://github.com/Bleackh/tanstack-excel-table/settings/branches
   ```

2. **Click "Add branch protection rule"**

3. **Configure the settings as described above**

4. **Save changes**

## Automated CI/CD

The repository includes GitHub Actions workflows that run automatically on pull requests:

- **`.github/workflows/ci.yml`**: Runs linting and build checks

These workflows ensure that all code merged into `main` meets quality standards.

## Benefits

- **Prevents accidental force pushes**: Protects commit history
- **Prevents branch deletion**: Ensures main branch always exists
- **Ensures code quality**: All code must pass linting and build checks
- **Requires code review**: At least one approval before merging
- **Maintains clean history**: No direct pushes to main branch

## Troubleshooting

### Status checks not appearing

If the required status checks (Lint, Build) don't appear in the dropdown:
1. Ensure the workflows have run at least once
2. Check that workflow files are in `.github/workflows/` directory
3. Verify workflow names match the required status check names

### Unable to merge PR

If you cannot merge a PR even though checks pass:
1. Ensure all required status checks have passed
2. Check that PR has required number of approvals
3. Verify all conversations are resolved
4. Make sure branch is up to date with main

## References

- [GitHub Branch Protection Documentation](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
