# Setup Instructions for Repository Administrators

This document provides step-by-step instructions for repository administrators to enable branch protection on the `main` branch.

## Overview

Branch protection has been set up for this repository with:
- ✅ GitHub Actions CI workflow (`.github/workflows/ci.yml`)
- ✅ Branch protection documentation (`.github/BRANCH_PROTECTION.md`)
- ✅ Updated contributing guidelines (`CONTRIBUTING.md`)
- ✅ Updated README with branch protection information

## Required Actions

### Step 1: Enable Branch Protection Rules

Branch protection rules must be enabled manually through GitHub's web interface or API.

#### Via GitHub Web Interface:

1. Navigate to the repository settings:
   ```
   https://github.com/Bleackh/tanstack-excel-table/settings/branches
   ```

2. Click **"Add branch protection rule"** (or edit if one already exists for `main`)

3. Configure the following settings:

   **Branch name pattern:**
   ```
   main
   ```

   **Protect matching branches - Check these boxes:**
   
   - ☑️ **Require a pull request before merging**
     - ☑️ Require approvals: `1`
     - ☑️ Dismiss stale pull request approvals when new commits are pushed
   
   - ☑️ **Require status checks to pass before merging**
     - ☑️ Require branches to be up to date before merging
     - **Status checks that are required:**
       - `Lint` (will appear after first workflow run)
       - `Build` (will appear after first workflow run)
   
   - ☑️ **Require conversation resolution before merging**
   
   - ☑️ **Do not allow bypassing the above settings**
   
   - ☑️ **Rules applied to everyone including administrators**

   **Additional settings:**
   
   - ☑️ **Allow force pushes: OFF** (keep disabled)
   - ☑️ **Allow deletions: OFF** (keep disabled)

4. Click **"Create"** or **"Save changes"**

### Step 2: Verify CI Workflows

The CI workflow (`.github/workflows/ci.yml`) runs automatically on:
- Pull requests targeting `main`
- Pushes to `main` branch

**First-time setup:**
1. Create a test pull request to trigger the workflow
2. Verify both jobs (`Lint` and `Build`) run successfully
3. Once they complete, the status checks will appear in the branch protection settings

### Step 3: Update Branch Protection (After First Workflow Run)

After the first successful workflow run:

1. Go back to branch protection settings
2. Under **"Require status checks to pass before merging"**, search for:
   - `Lint`
   - `Build`
3. Select both status checks to make them required

## Verification Checklist

Use this checklist to verify everything is set up correctly:

- [ ] Branch protection rule exists for `main` branch
- [ ] Pull requests are required before merging
- [ ] At least 1 approval is required
- [ ] Status checks `Lint` and `Build` are required
- [ ] Branches must be up to date before merging
- [ ] Conversations must be resolved before merging
- [ ] Force pushes are disabled
- [ ] Branch deletion is disabled
- [ ] Rules apply to administrators
- [ ] CI workflow file exists at `.github/workflows/ci.yml`
- [ ] Workflow has run at least once successfully
- [ ] Status checks appear in PR interface

## Testing Branch Protection

To test that branch protection is working:

1. **Test 1: Direct push should be blocked**
   ```bash
   git checkout main
   echo "test" >> README.md
   git commit -am "test: direct push"
   git push origin main
   ```
   Expected: ❌ Push should be rejected

2. **Test 2: PR without approval should be blocked**
   - Create a new branch and PR
   - Try to merge without approval
   Expected: ❌ Merge button should be disabled

3. **Test 3: PR with failing checks should be blocked**
   - Create a PR with code that fails linting
   - Try to merge after approval
   Expected: ❌ Merge should be blocked by failing status checks

4. **Test 4: Valid PR should succeed**
   - Create a PR with valid code
   - Get approval
   - Wait for checks to pass
   Expected: ✅ Merge should be allowed

## Troubleshooting

### Status checks not appearing

**Problem:** `Lint` and `Build` don't appear in the status checks dropdown.

**Solution:**
1. Ensure the workflow file is on the default branch
2. Create a test PR to trigger the workflow
3. Wait for the workflow to complete at least once
4. Refresh the branch protection settings page

### Workflow failing

**Problem:** CI workflow fails on every PR.

**Solution:**
1. Check workflow logs in the Actions tab
2. Common issues:
   - Missing dependencies (check `pnpm-lock.yaml`)
   - Linting errors (run `pnpm lint` locally)
   - Build errors (run `pnpm build` locally)
3. Fix issues and push corrections

### Cannot merge even with passing checks

**Problem:** Merge button is disabled despite passing checks.

**Solution:**
1. Verify all required status checks have passed
2. Ensure PR has required number of approvals
3. Check that all conversations are resolved
4. Verify branch is up to date with main

### Administrators can bypass protection

**Problem:** Administrators can still force push or bypass checks.

**Solution:**
1. Ensure "Do not allow bypassing the above settings" is checked
2. Ensure "Include administrators" or "Rules applied to everyone including administrators" is checked

## Maintenance

### Updating Required Checks

If you add new workflows or rename existing ones:

1. Update `.github/workflows/*.yml` files
2. Let the new workflow run at least once
3. Update branch protection settings to include new required checks
4. Update documentation in `.github/BRANCH_PROTECTION.md`

### Removing Branch Protection

If you need to temporarily disable branch protection:

1. Go to repository settings → Branches
2. Click the edit button next to the `main` rule
3. Uncheck the boxes you want to disable
4. Save changes

**Warning:** Only disable branch protection when absolutely necessary, and re-enable as soon as possible.

## Additional Resources

- [GitHub Branch Protection Documentation](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Repository Branch Protection Settings](./.github/BRANCH_PROTECTION.md)
- [Contributing Guidelines](./CONTRIBUTING.md)

## Support

If you encounter issues not covered in this guide:

1. Check the [GitHub Actions logs](https://github.com/Bleackh/tanstack-excel-table/actions)
2. Review the [Branch Protection documentation](./.github/BRANCH_PROTECTION.md)
3. Open an issue for help

---

**Note:** These settings help maintain code quality and prevent accidental changes to the main branch. They are considered best practices for collaborative development.
