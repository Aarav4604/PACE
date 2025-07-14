# Contributing to PACE

Thank you for your interest in contributing to PACE! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and Yarn 1.22+
- Docker and Docker Compose
- Python 3.11+ (for Python services)
- React Native development environment

### Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/your-username/pace.git
   cd pace
   ```

2. **Install Dependencies**
   ```bash
   yarn install
   ```

3. **Start Development Environment**
   ```bash
   yarn docker:up
   yarn seed
   yarn dev
   ```

## 📋 Development Workflow

### 1. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

### 2. Make Your Changes

- Follow the coding standards (see below)
- Write tests for new functionality
- Update documentation as needed

### 3. Test Your Changes

```bash
# Run all tests
yarn test

# Run linting
yarn lint

# Fix linting issues
yarn lint:fix
```

### 4. Commit Your Changes

```bash
git add .
git commit -m "feat: add new feature description"
```

### 5. Push and Create PR

```bash
git push origin feature/your-feature-name
```

## 🏗️ Project Structure

### Apps

- **`apps/mobile/`** - React Native mobile application
- **`apps/api/`** - NestJS REST API server
- **`apps/services/ingest/`** - FastAPI service for data ingestion
- **`apps/services/risk/`** - FastAPI service for risk calculations

### Packages

- **`packages/ui-kit/`** - Shared React Native components
- **`packages/schemas/`** - Shared DTOs and validation schemas
- **`packages/config/`** - Shared ESLint, Prettier, and TypeScript configs

## 📝 Coding Standards

### TypeScript/JavaScript

- Use **TypeScript** for all new code
- Follow **ESLint** and **Prettier** configurations
- Use **functional components** with hooks in React
- Implement proper **error handling** and **loading states**

### Python

- Use **Python 3.11+**
- Follow **Black** formatting (88 character line length)
- Use **Flake8** for linting
- Implement **type hints** for all functions
- Use **async/await** for I/O operations

### React Native

- Use **functional components** with hooks
- Implement **proper navigation** with typed parameters
- Use **shared UI components** from `@pace/ui-kit`
- Follow **mobile-first** design principles

### API Design

- Use **RESTful** conventions
- Implement **proper validation** with Zod schemas
- Return **consistent error responses**
- Use **HTTP status codes** correctly

## 🧪 Testing

### Unit Tests

- Write tests for all new functionality
- Maintain **>80% code coverage**
- Use **Jest** for JavaScript/TypeScript tests
- Use **pytest** for Python tests

### Integration Tests

- Test API endpoints with real database
- Test WebSocket connections
- Test Kafka message flows

### Example Test Structure

```typescript
// apps/api/src/pilots/pilots.service.spec.ts
describe('PilotsService', () => {
  let service: PilotsService;
  let repository: Repository<Pilot>;

  beforeEach(async () => {
    // Setup test database
  });

  it('should return list of pilots', async () => {
    const result = await service.findAll();
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
  });
});
```

## 📚 Documentation

### Code Documentation

- Use **JSDoc** for TypeScript/JavaScript functions
- Use **docstrings** for Python functions
- Document **complex algorithms** and **business logic**

### API Documentation

- Use **OpenAPI/Swagger** annotations
- Provide **request/response examples**
- Document **error codes** and **messages**

### README Updates

- Update **README.md** for new features
- Add **setup instructions** for new dependencies
- Document **environment variables**

## 🔒 Security

### Authentication & Authorization

- Implement **proper JWT validation**
- Use **role-based access control**
- Validate **input data** thoroughly

### Data Protection

- Use **environment variables** for secrets
- Implement **rate limiting**
- Use **HTTPS** in production

## 🚀 Deployment

### Local Development

```bash
# Start all services
yarn dev

# Build for production
yarn build

# Run production locally
yarn docker:build
docker-compose -f docker-compose.prod.yml up -d
```

### AWS Deployment

```bash
# Deploy infrastructure
cd infrastructure
terraform init
terraform plan
terraform apply

# Deploy applications
yarn deploy:aws
```

## 🐛 Bug Reports

### Before Submitting

1. Check if the bug has already been reported
2. Try to reproduce the issue
3. Check the logs for error messages

### Bug Report Template

```markdown
**Bug Description**
Brief description of the issue

**Steps to Reproduce**
1. Step 1
2. Step 2
3. Step 3

**Expected Behavior**
What should happen

**Actual Behavior**
What actually happens

**Environment**
- OS: [e.g., macOS, Windows, Linux]
- Node.js version: [e.g., 18.0.0]
- Yarn version: [e.g., 1.22.0]

**Additional Information**
Screenshots, logs, or other relevant information
```

## 💡 Feature Requests

### Before Submitting

1. Check if the feature has already been requested
2. Consider the impact on existing functionality
3. Think about implementation complexity

### Feature Request Template

```markdown
**Feature Description**
Brief description of the new feature

**Use Case**
Why this feature is needed

**Proposed Implementation**
How you think it should be implemented

**Alternatives Considered**
Other approaches you've considered

**Additional Information**
Mockups, examples, or other relevant information
```

## 🤝 Code Review Process

### Review Checklist

- [ ] Code follows project standards
- [ ] Tests are included and passing
- [ ] Documentation is updated
- [ ] No security vulnerabilities
- [ ] Performance impact is considered

### Review Guidelines

- Be **constructive** and **respectful**
- Focus on **code quality** and **functionality**
- Suggest **improvements** when possible
- Ask **clarifying questions** if needed

## 📞 Getting Help

### Resources

- **Documentation**: [docs.pace.trading](https://docs.pace.trading)
- **Issues**: [GitHub Issues](https://github.com/pace-trading/pace/issues)
- **Discord**: [PACE Community](https://discord.gg/pace)

### Questions

- Use **GitHub Discussions** for general questions
- Use **GitHub Issues** for bugs and feature requests
- Join our **Discord** for real-time help

## 🎉 Recognition

Contributors will be recognized in:

- **README.md** contributors section
- **Release notes** for significant contributions
- **Community shoutouts** for exceptional work

---

Thank you for contributing to PACE! 🚀 