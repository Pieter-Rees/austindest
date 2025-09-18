# Contributing Guide

Thank you for your interest in contributing to the Press Kit AD project! This guide will help you get started with contributing to the codebase.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Contributing Process](#contributing-process)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Pull Request Process](#pull-request-process)
- [Issue Reporting](#issue-reporting)

## 🤝 Code of Conduct

We are committed to providing a welcoming and inclusive environment for all contributors. Please:

- Be respectful and constructive
- Focus on what's best for the community
- Show empathy towards other community members
- Accept constructive criticism gracefully
- Help create a positive environment

## 🚀 Getting Started

### Prerequisites

- Node.js 20.18.0 or higher
- pnpm 9.15.0 or higher
- Git
- VS Code (recommended)

### Fork and Clone

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:

   ```bash
   git clone https://github.com/your-username/press-kit-ad.git
   cd press-kit-ad
   ```

3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/original-owner/press-kit-ad.git
   ```

## 🛠️ Development Setup

### 1. Install Dependencies

```bash
# Install pnpm if not already installed
npm install -g pnpm

# Install project dependencies
pnpm install
```

### 2. Environment Setup

```bash
# Copy environment file
cp .env.example .env.local

# Edit environment variables as needed
nano .env.local
```

### 3. Development Server

```bash
# Start development server
pnpm dev

# Open http://localhost:3000 in your browser
```

### 4. Run Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

### 5. Code Quality

```bash
# Run linting
pnpm lint

# Fix linting issues
pnpm lint:fix

# Run type checking
pnpm typecheck

# Run all quality checks
pnpm validate
```

## 📝 Contributing Process

### 1. Create a Branch

```bash
# Create and switch to a new branch
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/issue-description
```

### 2. Make Changes

- Write clean, readable code
- Follow the coding standards
- Add tests for new functionality
- Update documentation as needed

### 3. Test Your Changes

```bash
# Run all tests
pnpm test

# Check code quality
pnpm validate

# Build the project
pnpm build
```

### 4. Commit Changes

```bash
# Stage your changes
git add .

# Commit with a descriptive message
git commit -m "feat: add new feature description"

# Push to your fork
git push origin feature/your-feature-name
```

## 📏 Coding Standards

### TypeScript

- Use strict TypeScript configuration
- Prefer `interface` over `type` for object shapes
- Use explicit return types for functions
- Avoid `any` type, use `unknown` instead
- Use proper generic constraints

```typescript
// Good
interface UserProps {
  name: string;
  email: string;
}

function createUser(user: UserProps): User {
  // implementation
}

// Avoid
function createUser(user: any): any {
  // implementation
}
```

### React

- Use functional components with hooks
- Prefer `useCallback` and `useMemo` for performance
- Use proper prop types and interfaces
- Follow the component naming convention

```tsx
// Good
interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
}) => {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick}>
      {children}
    </button>
  );
};
```

### CSS/Styling

- Use Tailwind CSS classes
- Follow mobile-first responsive design
- Use semantic class names
- Avoid inline styles

```tsx
// Good
<div className="flex flex-col md:flex-row gap-4 p-6 bg-white rounded-lg shadow-md">
  <h2 className="text-2xl font-bold text-gray-900">Title</h2>
  <p className="text-gray-600">Description</p>
</div>

// Avoid
<div style={{ display: 'flex', padding: '24px' }}>
  <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Title</h2>
</div>
```

### File Organization

- Use kebab-case for file names
- Group related files in directories
- Use index files for clean imports
- Follow the established project structure

```
src/
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   └── index.ts
│   └── features/
│       ├── user-profile.tsx
│       └── index.ts
├── hooks/
│   ├── use-debounce.ts
│   └── use-performance.ts
└── lib/
    ├── utils.ts
    └── security.ts
```

## 🧪 Testing Guidelines

### Test Structure

- Write tests for all new functionality
- Aim for 95%+ code coverage
- Use descriptive test names
- Group related tests in describe blocks

```typescript
// Good
describe('Button Component', () => {
  it('should render with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should call onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Test Types

1. **Unit Tests**: Test individual components and functions
2. **Integration Tests**: Test component interactions
3. **Security Tests**: Test security utilities and middleware
4. **Performance Tests**: Test performance monitoring hooks

### Test Commands

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage

# Run specific test file
pnpm test button.test.tsx

# Run tests matching pattern
pnpm test --testNamePattern="Button"
```

## 🔄 Pull Request Process

### 1. Before Submitting

- [ ] Code follows the coding standards
- [ ] All tests pass
- [ ] Code coverage is maintained
- [ ] Documentation is updated
- [ ] No linting errors
- [ ] TypeScript compilation succeeds

### 2. Pull Request Template

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Security enhancement

## Testing

- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] All tests pass
- [ ] Manual testing completed

## Checklist

- [ ] Code follows project standards
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes (or documented)
```

### 3. Review Process

1. **Automated Checks**: CI/CD pipeline runs automatically
2. **Code Review**: Maintainers review the code
3. **Testing**: Manual testing if needed
4. **Approval**: At least one approval required
5. **Merge**: Squash and merge to main branch

## 🐛 Issue Reporting

### Bug Reports

When reporting bugs, please include:

1. **Description**: Clear description of the issue
2. **Steps to Reproduce**: Detailed steps to reproduce
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Environment**: OS, browser, Node.js version
6. **Screenshots**: If applicable

### Feature Requests

When requesting features, please include:

1. **Description**: Clear description of the feature
2. **Use Case**: Why this feature is needed
3. **Proposed Solution**: How you think it should work
4. **Alternatives**: Other solutions considered
5. **Additional Context**: Any other relevant information

### Issue Templates

Use the provided issue templates:

- Bug report template
- Feature request template
- Question template

## 📚 Documentation

### Code Documentation

- Use JSDoc for functions and classes
- Write clear, concise comments
- Document complex logic
- Keep documentation up to date

```typescript
/**
 * Debounces a value update to prevent excessive re-renders
 * @param value - The value to debounce
 * @param delay - The delay in milliseconds
 * @returns The debounced value
 */
export function useDebounce<T>(value: T, delay: number): T {
  // implementation
}
```

### README Updates

- Update README.md for new features
- Add installation instructions for new dependencies
- Update configuration examples
- Keep the project structure current

## 🚀 Release Process

### Versioning

We use [Semantic Versioning](https://semver.org/):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Changelog

- Update CHANGELOG.md for each release
- Include all significant changes
- Group changes by type (Added, Changed, Fixed, Removed)
- Include migration notes for breaking changes

## 🆘 Getting Help

If you need help:

1. **Check Documentation**: Read the README and API docs
2. **Search Issues**: Look for similar issues
3. **Ask Questions**: Use the discussion forum
4. **Contact Maintainers**: Reach out directly if needed

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT License).

---

Thank you for contributing to the Press Kit AD project! 🎉
