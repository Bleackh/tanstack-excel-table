# Branch Protection and Merge Permission Guide

This guide explains how to configure your GitHub repository so that everyone can submit pull requests, but only you (the repository owner) can merge them.

## 🔒 Branch Protection Rules

Branch protection rules allow you to enforce certain workflows for one or more branches. Follow these steps to restrict merge permissions:

### Step 1: Access Branch Protection Settings

1. Go to your repository on GitHub: `https://github.com/Bleackh/tanstack-excel-table`
2. Click on **Settings** (top navigation bar)
3. In the left sidebar, click **Branches** under "Code and automation"
4. Click **Add branch protection rule** or edit an existing rule

### Step 2: Configure Protection Rule for `main` Branch

#### Basic Settings:
- **Branch name pattern**: `main` (or `*` for all branches)

#### Required Settings to Restrict Merging:

✅ **Check these options:**

1. **Require a pull request before merging**
   - ✅ Enable this option
   - This ensures no one can push directly to the main branch
   - All changes must go through pull requests

2. **Require approvals**
   - Set **Required number of approvals before merging**: `1`
   - This means at least one approval is needed before merging

3. **Dismiss stale pull request approvals when new commits are pushed**
   - ✅ Enable this for additional security
   - Ensures reviews are fresh and up-to-date

4. **Require review from Code Owners**
   - ✅ Enable this option
   - This works together with the CODEOWNERS file (see below)
   - Only designated code owners (you) can approve PRs

5. **Restrict who can dismiss pull request reviews**
   - ✅ Enable this option
   - Add yourself to the list of people who can dismiss reviews

6. **Require status checks to pass before merging** (Optional)
   - If you have CI/CD workflows, enable this
   - Select the required checks (tests, linting, etc.)

7. **Require conversation resolution before merging** (Recommended)
   - ✅ Enable this option
   - All review comments must be resolved before merging

8. **Do not allow bypassing the above settings**
   - ✅ Enable "Do not allow bypassing the above settings"
   - This ensures even administrators must follow these rules
   - **Important**: You can create an exception for yourself below

9. **Restrict who can push to matching branches**
   - ✅ Enable this option
   - **Important**: Add yourself to the list
   - This is the KEY setting - only people in this list can merge PRs
   - Leave empty or add only your username to ensure only you can merge

#### Click "Create" or "Save changes"

---

## 👥 CODEOWNERS Configuration

The CODEOWNERS file automatically assigns you as a reviewer for all PRs. This file has been created in `.github/CODEOWNERS`.

**How it works:**
- When anyone opens a PR, you are automatically assigned as a reviewer
- With "Require review from Code Owners" enabled in branch protection, PRs cannot be merged without your approval
- Only you can approve PRs since you're the only code owner

---

## 🔑 Key Points Summary

After following these steps:

✅ **Anyone can:**
- Fork the repository
- Create feature branches
- Submit pull requests
- Comment on PRs
- View all code and issues

❌ **Only you can:**
- Approve pull requests
- Merge pull requests
- Push directly to protected branches (main)
- Dismiss pull request reviews

---

## 🧪 Testing the Configuration

To verify your setup is working:

1. **Ask a contributor** to create a test PR
2. **Try to merge** the PR without approval
   - Should be blocked with message: "Required reviews not met"
3. **Verify** that only you can see the merge button enabled after approval
4. **Test** that the contributor cannot merge their own PR

---

## ⚠️ Important Notes

1. **Free vs Paid GitHub Plans:**
   - Some advanced branch protection features require GitHub Pro or Team plan
   - The core "Restrict who can push" feature is available on all plans for public repos
   - For private repos, you may need a paid plan for all features

2. **Repository Visibility:**
   - Branch protection works for both public and private repositories
   - Some features vary between free and paid plans

3. **Collaborators vs Contributors:**
   - Anyone can fork and submit PRs (contributors)
   - Collaborators are invited users with write access
   - Branch protection applies to collaborators, but forks/PRs work for everyone

4. **Emergency Access:**
   - As the repository owner/admin, you can always adjust these settings
   - You can temporarily disable protection if needed for critical fixes

---

## 🔄 Alternative: Repository Settings

If you want additional control over collaborators:

1. Go to **Settings** → **Collaborators and teams**
2. Here you can:
   - See all people with access
   - Adjust their permission levels (Read, Write, Admin)
   - Remove access if needed

**Recommendation**: 
- Don't add direct collaborators if you want full control
- Let everyone contribute via forks and PRs
- Use branch protection as described above

---

## 📚 Additional Resources

- [GitHub Docs: Branch Protection Rules](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- [GitHub Docs: CODEOWNERS](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners)
- [GitHub Docs: Pull Request Reviews](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews)

---

## 🆘 Need Help?

If you have questions about setting up branch protection:
1. Check the GitHub documentation links above
2. Open an issue in the repository
3. Contact GitHub Support for plan-specific features

---

**Last Updated**: 2025
**Repository**: Bleackh/tanstack-excel-table
