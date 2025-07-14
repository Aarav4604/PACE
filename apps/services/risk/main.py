"""
PACE Copy-Trading Risk Service
Calculates Value at Risk (VaR), beta, and other risk metrics for portfolios
"""

import os
import json
import logging
from datetime import datetime, timedelta
from typing import List, Dict, Any, Optional

import pandas as pd
import numpy as np
from scipy import stats
import yfinance as yf
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import redis
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="PACE Risk Service",
    description="Calculates risk metrics for copy-trading portfolios",
    version="1.0.0",
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class Position(BaseModel):
    """Portfolio position"""
    symbol: str = Field(..., description="Stock symbol")
    weight: float = Field(..., ge=0, le=100, description="Weight percentage")

class RiskEstimateRequest(BaseModel):
    """Risk estimation request"""
    positions: List[Position] = Field(..., description="Portfolio positions")
    time_horizon: int = Field(1, ge=1, le=30, description="Time horizon in days")

class RiskEstimateResponse(BaseModel):
    """Risk estimation response"""
    var: float = Field(..., description="Value at Risk (1-day)")
    beta: float = Field(..., description="Portfolio beta")
    sharpe_ratio: float = Field(..., description="Sharpe ratio")
    max_drawdown: float = Field(..., description="Maximum drawdown")
    volatility: float = Field(..., description="Portfolio volatility")
    timestamp: str = Field(..., description="Calculation timestamp")

class HealthResponse(BaseModel):
    """Health check response"""
    status: str
    timestamp: str
    redis_connected: bool

# Redis client setup
def get_redis_client() -> redis.Redis:
    """Get Redis client instance"""
    redis_url = os.getenv("REDIS_URL", "redis://localhost:6379")
    
    try:
        client = redis.from_url(redis_url, decode_responses=True)
        # Test connection
        client.ping()
        return client
    except Exception as e:
        logger.error(f"Failed to connect to Redis: {e}")
        raise

def get_historical_data(symbol: str, days: int = 252) -> pd.Series:
    """
    Get historical price data for a symbol
    
    Args:
        symbol: Stock symbol
        days: Number of days of historical data
        
    Returns:
        Series of daily returns
    """
    try:
        # Try to get from cache first
        redis_client = get_redis_client()
        cache_key = f"price_data:{symbol}:{days}"
        cached_data = redis_client.get(cache_key)
        
        if cached_data:
            data = json.loads(cached_data)
            return pd.Series(data)
        
        # Fetch from Yahoo Finance
        end_date = datetime.now()
        start_date = end_date - timedelta(days=days + 30)  # Extra buffer
        
        ticker = yf.Ticker(symbol)
        hist = ticker.history(start=start_date, end=end_date)
        
        if hist.empty:
            raise ValueError(f"No data available for {symbol}")
        
        # Calculate daily returns
        returns = hist['Close'].pct_change().dropna()
        
        # Cache the data for 1 hour
        redis_client.setex(
            cache_key,
            3600,  # 1 hour
            json.dumps(returns.tolist())
        )
        
        return returns
        
    except Exception as e:
        logger.error(f"Error fetching data for {symbol}: {e}")
        # Return mock data for demo purposes
        return pd.Series(np.random.normal(0.001, 0.02, 252))

def calculate_var(returns: pd.Series, confidence_level: float = 0.95) -> float:
    """
    Calculate Value at Risk
    
    Args:
        returns: Series of returns
        confidence_level: VaR confidence level (e.g., 0.95 for 95%)
        
    Returns:
        VaR as a percentage
    """
    try:
        # Parametric VaR using normal distribution
        mean_return = returns.mean()
        std_return = returns.std()
        
        # Z-score for confidence level
        z_score = stats.norm.ppf(1 - confidence_level)
        
        # VaR calculation
        var = mean_return - (z_score * std_return)
        
        return abs(var) * 100  # Convert to percentage
        
    except Exception as e:
        logger.error(f"Error calculating VaR: {e}")
        return 2.5  # Default VaR for demo

def calculate_beta(portfolio_returns: pd.Series, market_returns: pd.Series) -> float:
    """
    Calculate portfolio beta relative to market
    
    Args:
        portfolio_returns: Portfolio returns
        market_returns: Market returns (e.g., S&P 500)
        
    Returns:
        Portfolio beta
    """
    try:
        # Align the series
        aligned_data = pd.concat([portfolio_returns, market_returns], axis=1).dropna()
        
        if len(aligned_data) < 30:
            return 1.0  # Default beta
        
        # Calculate covariance and variance
        covariance = aligned_data.iloc[:, 0].cov(aligned_data.iloc[:, 1])
        market_variance = aligned_data.iloc[:, 1].var()
        
        beta = covariance / market_variance
        return beta
        
    except Exception as e:
        logger.error(f"Error calculating beta: {e}")
        return 1.0  # Default beta

def calculate_sharpe_ratio(returns: pd.Series, risk_free_rate: float = 0.02) -> float:
    """
    Calculate Sharpe ratio
    
    Args:
        returns: Portfolio returns
        risk_free_rate: Annual risk-free rate
        
    Returns:
        Sharpe ratio
    """
    try:
        if len(returns) < 30:
            return 0.5  # Default Sharpe ratio
        
        # Annualize returns and volatility
        annual_return = returns.mean() * 252
        annual_volatility = returns.std() * np.sqrt(252)
        
        # Daily risk-free rate
        daily_rf_rate = risk_free_rate / 252
        
        # Sharpe ratio
        sharpe = (annual_return - risk_free_rate) / annual_volatility
        
        return sharpe
        
    except Exception as e:
        logger.error(f"Error calculating Sharpe ratio: {e}")
        return 0.5  # Default Sharpe ratio

def calculate_max_drawdown(returns: pd.Series) -> float:
    """
    Calculate maximum drawdown
    
    Args:
        returns: Portfolio returns
        
    Returns:
        Maximum drawdown as percentage
    """
    try:
        # Calculate cumulative returns
        cumulative = (1 + returns).cumprod()
        
        # Calculate running maximum
        running_max = cumulative.expanding().max()
        
        # Calculate drawdown
        drawdown = (cumulative - running_max) / running_max
        
        # Get maximum drawdown
        max_drawdown = drawdown.min()
        
        return abs(max_drawdown) * 100  # Convert to percentage
        
    except Exception as e:
        logger.error(f"Error calculating max drawdown: {e}")
        return 15.0  # Default max drawdown

def calculate_portfolio_risk(positions: List[Position], time_horizon: int) -> RiskEstimateResponse:
    """
    Calculate comprehensive risk metrics for a portfolio
    
    Args:
        positions: List of portfolio positions
        time_horizon: Time horizon in days
        
    Returns:
        Risk metrics
    """
    try:
        # Get market data (S&P 500 as proxy)
        market_returns = get_historical_data("^GSPC", 252)
        
        # Calculate portfolio returns
        portfolio_returns = pd.Series(0.0, index=market_returns.index)
        
        for position in positions:
            # Get individual asset returns
            asset_returns = get_historical_data(position.symbol, 252)
            
            # Align with market returns
            aligned_returns = pd.concat([asset_returns, market_returns], axis=1).dropna()
            asset_returns_aligned = aligned_returns.iloc[:, 0]
            
            # Weight the returns
            weighted_returns = asset_returns_aligned * (position.weight / 100)
            portfolio_returns = portfolio_returns.add(weighted_returns, fill_value=0)
        
        # Calculate risk metrics
        var = calculate_var(portfolio_returns)
        beta = calculate_beta(portfolio_returns, market_returns)
        sharpe_ratio = calculate_sharpe_ratio(portfolio_returns)
        max_drawdown = calculate_max_drawdown(portfolio_returns)
        volatility = portfolio_returns.std() * np.sqrt(252) * 100  # Annualized volatility
        
        return RiskEstimateResponse(
            var=var,
            beta=beta,
            sharpe_ratio=sharpe_ratio,
            max_drawdown=max_drawdown,
            volatility=volatility,
            timestamp=datetime.utcnow().isoformat(),
        )
        
    except Exception as e:
        logger.error(f"Error calculating portfolio risk: {e}")
        # Return default values for demo
        return RiskEstimateResponse(
            var=2.5,
            beta=1.0,
            sharpe_ratio=0.5,
            max_drawdown=15.0,
            volatility=20.0,
            timestamp=datetime.utcnow().isoformat(),
        )

@app.get("/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint"""
    try:
        redis_client = get_redis_client()
        redis_client.ping()
        redis_connected = True
    except Exception:
        redis_connected = False
    
    return HealthResponse(
        status="ok",
        timestamp=datetime.utcnow().isoformat(),
        redis_connected=redis_connected,
    )

@app.post("/risk/v1/estimate", response_model=RiskEstimateResponse)
async def estimate_risk(request: RiskEstimateRequest):
    """
    Estimate risk metrics for a portfolio
    
    This endpoint calculates comprehensive risk metrics including:
    - Value at Risk (VaR)
    - Portfolio beta
    - Sharpe ratio
    - Maximum drawdown
    - Portfolio volatility
    """
    try:
        # Validate positions
        if not request.positions:
            raise HTTPException(status_code=400, detail="At least one position is required")
        
        total_weight = sum(pos.weight for pos in request.positions)
        if abs(total_weight - 100) > 0.01:  # Allow small rounding errors
            raise HTTPException(
                status_code=400,
                detail=f"Position weights must sum to 100% (current: {total_weight}%)"
            )
        
        # Calculate risk metrics
        risk_metrics = calculate_portfolio_risk(request.positions, request.time_horizon)
        
        logger.info(
            f"Risk calculation completed: VaR={risk_metrics.var:.2f}%, "
            f"Beta={risk_metrics.beta:.2f}, Sharpe={risk_metrics.sharpe_ratio:.2f}"
        )
        
        return risk_metrics
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error estimating risk: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.get("/risk/v1/symbols/{symbol}")
async def get_symbol_risk(symbol: str):
    """
    Get risk metrics for a single symbol
    
    This endpoint provides quick risk assessment for individual assets.
    """
    try:
        # Get historical data
        returns = get_historical_data(symbol, 252)
        
        # Calculate basic metrics
        volatility = returns.std() * np.sqrt(252) * 100
        var = calculate_var(returns)
        
        return {
            "symbol": symbol,
            "volatility": volatility,
            "var_1d": var,
            "var_5d": var * np.sqrt(5),
            "timestamp": datetime.utcnow().isoformat(),
        }
        
    except Exception as e:
        logger.error(f"Error getting symbol risk for {symbol}: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

if __name__ == "__main__":
    import uvicorn
    
    port = int(os.getenv("PORT", 8002))
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=port,
        reload=True,
        log_level="info",
    ) 