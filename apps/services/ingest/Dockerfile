# Multi-stage build for PACE Ingest Service
FROM python:3.11-slim as builder

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install Python dependencies
COPY pyproject.toml .
RUN pip install --no-cache-dir --user .

# Production stage
FROM python:3.11-slim

# Create non-root user
RUN groupadd -r pace && useradd -r -g pace pace

# Set working directory
WORKDIR /app

# Install runtime dependencies
RUN apt-get update && apt-get install -y \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy Python packages from builder
COPY --from=builder /root/.local /home/pace/.local

# Copy application code
COPY main.py .

# Set PATH to include user packages
ENV PATH=/home/pace/.local/bin:$PATH

# Change ownership to non-root user
RUN chown -R pace:pace /app

# Switch to non-root user
USER pace

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8001/health || exit 1

# Expose port
EXPOSE 8001

# Run the application
CMD ["python", "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8001"] 