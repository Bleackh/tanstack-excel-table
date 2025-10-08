# .github Directory

This directory contains GitHub-specific configuration, documentation, and workflows for the TanStack Excel Table repository.

## 📁 Contents

### Workflows
- **[ci.yml](./workflows/ci.yml)** - Continuous Integration workflow that runs linting and build checks on all pull requests

### Documentation
- **[BRANCH_PROTECTION.md](./BRANCH_PROTECTION.md)** - Detailed guide on branch protection settings and configuration
- **[SETUP_INSTRUCTIONS.md](./SETUP_INSTRUCTIONS.md)** - Step-by-step instructions for repository administrators to enable branch protection
- **[CI_CHECKS.md](./CI_CHECKS.md)** - Quick reference for understanding and troubleshooting CI status checks

### Templates
- **[PULL_REQUEST_TEMPLATE.md](./PULL_REQUEST_TEMPLATE.md)** - Template for pull request descriptions

## 🔒 Branch Protection

The `main` branch is protected with the following requirements:
- ✅ All CI checks must pass (Lint and Build)
- ✅ At least one approval from a maintainer
- ✅ All conversations must be resolved
- ✅ Branch must be up to date before merging
- ❌ No force pushes allowed
- ❌ No direct pushes allowed
- ❌ Branch deletion disabled

## 🚀 Quick Start for Contributors

1. **Before submitting a PR**, run locally:
   ```bash
   pnpm lint   # Check code style
   pnpm build  # Verify build
   ```

2. **Create your PR** using the pull request template

3. **Wait for CI checks** to complete (visible in the PR)

4. **Request review** from a maintainer

5. **Address feedback** and resolve conversations

6. **Merge** once all requirements are met

## 📚 For Repository Administrators

Start here: **[SETUP_INSTRUCTIONS.md](./SETUP_INSTRUCTIONS.md)**

This guide will walk you through:
- Enabling branch protection rules
- Configuring required status checks
- Verifying the setup
- Troubleshooting common issues

## 🔧 Modifying Workflows

To modify or add CI checks:

1. Edit or create workflow files in `./workflows/`
2. Test changes on a feature branch first
3. Update relevant documentation
4. Update branch protection settings if adding new required checks

## 📖 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Branch Protection Documentation](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches)
- [Project Contributing Guidelines](../CONTRIBUTING.md)
- [Main README](../README.md)

## ❓ Questions?

- For contribution questions: See [CONTRIBUTING.md](../CONTRIBUTING.md)
- For CI/workflow questions: See [CI_CHECKS.md](./CI_CHECKS.md)
- For setup questions: See [SETUP_INSTRUCTIONS.md](./SETUP_INSTRUCTIONS.md)
- For general questions: Open an issue

---

Last updated: 2025
