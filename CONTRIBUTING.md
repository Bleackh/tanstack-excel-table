# Contributing to TanStack Excel Table

First off, thank you for considering contributing to TanStack Excel Table! 🎉

## 🤝 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples** (code snippets, screenshots)
- **Describe the behavior you observed** and what you expected
- **Include your environment details** (OS, Node version, browser)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide a detailed description** of the suggested enhancement
- **Explain why this enhancement would be useful**
- **Include code examples** if applicable

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Make your changes** following our code style
3. **Test your changes** thoroughly
4. **Update documentation** if needed
5. **Commit your changes** with clear commit messages
6. **Push to your fork** and submit a pull request

## 📝 Development Setup

### Prerequisites

- Node.js 20+
- pnpm (recommended) or npm

### Setup Instructions

1. Clone your fork:
```bash
git clone https://github.com/YOUR-USERNAME/tanstack-excel-table.git
cd tanstack-excel-table
```

2. Install dependencies:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) to see your changes

## 💻 Code Style

- Use **TypeScript** for type safety
- Follow existing code formatting (ESLint configuration)
- Write **clear and descriptive variable/function names**
- Add **comments for complex logic**
- Keep functions **small and focused**

### File Structure

```
src/
├── components/
│   ├── ExcelTable/          # Main table component
│   │   ├── ExcelTable.tsx   # Core implementation
│   │   ├── types.ts         # TypeScript types
│   │   └── *.md             # Documentation
│   └── ui/                  # Shadcn UI components
```

## ✅ Testing

Before submitting a pull request:

1. **Test basic functionality**:
   - Copy/paste/cut operations
   - Undo/redo functionality
   - Drag-fill handle
   - Keyboard navigation
   - Sorting and filtering

2. **Test edge cases**:
   - Empty data
   - Single row/column
   - Large datasets

3. **Cross-browser testing** (if UI changes):
   - Chrome
   - Firefox
   - Safari
   - Edge

## 📋 Commit Message Guidelines

Use clear and meaningful commit messages:

- `feat: add new feature`
- `fix: resolve bug in component`
- `docs: update README`
- `style: format code`
- `refactor: restructure component`
- `test: add tests`
- `chore: update dependencies`

Examples:
```
feat: add cell merge functionality
fix: resolve drag-fill pattern detection
docs: add examples for custom cell rendering
```

## 🌟 Areas We Need Help With

- 📱 **Mobile responsiveness** improvements
- 🎨 **Theme customization** options
- 🧪 **Unit tests** for core functionality
- 📚 **Documentation** and examples
- 🌐 **Internationalization** (i18n)
- ♿ **Accessibility** improvements
- 🐛 **Bug fixes** and performance optimization

## 📄 License

By contributing to TanStack Excel Table, you agree that your contributions will be licensed under the MIT License.

## 💬 Questions?

Feel free to open an issue for:
- Questions about the codebase
- Help with your contribution
- General discussions

## 🙏 Thank You!

Your contributions make this project better for everyone. We appreciate your time and effort! ⭐

---

**Happy coding!** 🚀
