# PACE - Copy-Trading Platform

**Pick • Analyze • Copy • Execute**

A mobile-first copy-trading platform that allows users to follow successful traders and automatically execute their strategies.

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Mobile App    │    │   NestJS API    │    │  Python Services│
│  (React Native) │◄──►│   (TypeScript)  │◄──►│  (FastAPI)      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   WebSocket     │    │   PostgreSQL    │    │     Kafka       │
│   (Real-time)   │    │   (Database)    │    │  (Message Queue)│
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and **Yarn** 1.22+
- **Docker** and **Docker Compose**
- **Python** 3.11+ (for local development)
- **React Native** development environment

### 1. Clone and Setup

```bash
git clone <repository-url>
cd pace
yarn install
```

### 2. Start Infrastructure

```bash
# Start all services (PostgreSQL, Kafka, Redis)
yarn docker:up

# Seed the database with demo data
yarn seed
```

### 3. Start Development Servers

```bash
# Start all services in development mode
yarn dev

# Or start individual services:
yarn dev:api      # NestJS API (port 3000)
yarn dev:mobile   # React Native Metro (port 8081)
yarn dev:ingest   # Python Ingest Service (port 8001)
yarn dev:risk     # Python Risk Service (port 8002)
```

### 4. Access Services

- **API Documentation**: http://localhost:3000/api/v1
- **Kafka UI**: http://localhost:8080
- **Mobile App**: Run on device/simulator

## 📱 Mobile App Features

### Core Screens

1. **Onboarding** - Email/OTP authentication
2. **LinkBroker** - Plaid WebView for broker connection
3. **PilotList** - Browse and follow successful traders
4. **SlateBuilder** - Create custom portfolios with drag-and-drop
5. **Dashboard** - Real-time P&L tracking and performance metrics

### Key Features

- **Real-time Updates** - WebSocket connection for live P&L
- **Risk Analytics** - VaR, beta, Sharpe ratio calculations
- **Portfolio Management** - Custom slate building with weight allocation
- **Performance Tracking** - 30-day returns, drawdown analysis

## 🔧 Development

### Project Structure

```
pace/
├── apps/
│   ├── mobile/           # React Native app
│   ├── api/             # NestJS REST API
│   └── services/
│       ├── ingest/      # FastAPI + Kafka producer
│       └── risk/        # FastAPI + pandas risk calculations
├── packages/
│   ├── ui-kit/          # Shared React Native components
│   ├── schemas/         # Shared DTOs and validation
│   └── config/          # ESLint, Prettier, TypeScript configs
├── infrastructure/      # Terraform for AWS deployment
└── docker-compose.yml   # Local development environment
```

### Available Scripts

```bash
# Development
yarn dev                 # Start all services
yarn dev:api            # Start API only
yarn dev:mobile         # Start mobile only

# Building
yarn build              # Build all packages
yarn build:packages     # Build shared packages
yarn build:apps         # Build applications

# Testing
yarn test               # Run all tests
yarn lint               # Lint all code
yarn lint:fix           # Fix linting issues

# Database
yarn seed               # Seed database with demo data

# Docker
yarn docker:up          # Start infrastructure
yarn docker:down        # Stop infrastructure
yarn docker:build       # Build all images
```

### Environment Variables

Create `.env` files in each app directory:

```bash
# apps/api/.env
DATABASE_URL=postgresql://pace_user:pace_password@localhost:5432/pace_db
REDIS_URL=redis://localhost:6379
KAFKA_BROKERS=localhost:9092
JWT_SECRET=your-super-secret-jwt-key

# apps/services/ingest/.env
KAFKA_BROKERS=localhost:9092
ALPACA_WEBHOOK_SECRET=your-alpaca-webhook-secret

# apps/services/risk/.env
REDIS_URL=redis://localhost:6379
```

## 🧪 Testing

### Unit Tests

```bash
# Run all tests
yarn test

# Run specific test suites
yarn test --testPathPattern=api
yarn test --testPathPattern=mobile
```

### Integration Tests

```bash
# Start test environment
docker-compose -f docker-compose.test.yml up -d

# Run integration tests
yarn test:e2e
```

## 🚀 Deployment

### Local Production Build

```bash
# Build all services
yarn docker:build

# Start production environment
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

## 📊 Monitoring

### Health Checks

- **API**: `GET /healthz`
- **Ingest**: `GET /health`
- **Risk**: `GET /health`

### Metrics

- **API Response Times**: Prometheus metrics on `/metrics`
- **Kafka Lag**: Monitor consumer group lag
- **Database Performance**: PostgreSQL query analytics

## 🔒 Security

### Authentication

- **JWT-based** authentication with Auth0 integration
- **Rate limiting** (60 req/min per IP)
- **CORS** configured for mobile app

### Data Protection

- **Encrypted** database connections
- **Secure** WebSocket connections
- **Input validation** with Zod schemas

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Quality

- **ESLint** and **Prettier** for code formatting
- **Husky** pre-commit hooks
- **TypeScript** strict mode enabled
- **Black** and **Flake8** for Python code

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [docs.pace.trading](https://docs.pace.trading)
- **Issues**: [GitHub Issues](https://github.com/pace-trading/pace/issues)
- **Discord**: [PACE Community](https://discord.gg/pace)

---

**Built with ❤️ by the PACE Team** 