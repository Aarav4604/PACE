"""
PACE Copy-Trading Ingest Service
Receives Alpaca webhooks, normalizes data, and publishes to Kafka
"""

import os
import json
import logging
from datetime import datetime
from typing import Dict, Any

import pandas as pd
from fastapi import FastAPI, HTTPException, Request, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from kafka import KafkaProducer
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="PACE Ingest Service",
    description="Receives Alpaca webhooks and publishes normalized trade data to Kafka",
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

# Pydantic models for request/response validation
class AlpacaWebhook(BaseModel):
    """Alpaca webhook payload structure"""
    event: str = Field(..., description="Event type")
    order: Dict[str, Any] = Field(..., description="Order details")
    execution: Dict[str, Any] = Field(..., description="Execution details")

class NormalizedTrade(BaseModel):
    """Normalized trade data structure"""
    symbol: str = Field(..., description="Stock symbol")
    side: str = Field(..., description="Buy or sell")
    quantity: float = Field(..., description="Quantity traded")
    price: float = Field(..., description="Execution price")
    timestamp: str = Field(..., description="ISO timestamp")
    pilot_id: str = Field(..., description="Pilot ID")

class HealthResponse(BaseModel):
    """Health check response"""
    status: str
    timestamp: str
    kafka_connected: bool

# Kafka producer setup
def get_kafka_producer() -> KafkaProducer:
    """Get Kafka producer instance"""
    kafka_brokers = os.getenv("KAFKA_BROKERS", "localhost:9092").split(",")
    
    try:
        producer = KafkaProducer(
            bootstrap_servers=kafka_brokers,
            value_serializer=lambda v: json.dumps(v).encode('utf-8'),
            key_serializer=lambda k: k.encode('utf-8') if k else None,
            retries=3,
            acks='all',
        )
        return producer
    except Exception as e:
        logger.error(f"Failed to create Kafka producer: {e}")
        raise

def normalize_alpaca_data(webhook_data: Dict[str, Any]) -> NormalizedTrade:
    """
    Normalize Alpaca webhook data to our internal format
    
    Args:
        webhook_data: Raw Alpaca webhook payload
        
    Returns:
        Normalized trade data
    """
    try:
        # Extract order and execution details
        order = webhook_data.get("order", {})
        execution = webhook_data.get("execution", {})
        
        # Map Alpaca fields to our format
        symbol = order.get("symbol", "")
        side = order.get("side", "").lower()
        quantity = float(execution.get("qty", 0))
        price = float(execution.get("price", 0))
        timestamp = execution.get("timestamp", datetime.utcnow().isoformat())
        
        # For demo purposes, assign to a mock pilot
        # In production, this would be determined by the order's metadata
        pilot_id = order.get("client_order_id", "pilot-1")
        
        return NormalizedTrade(
            symbol=symbol,
            side=side,
            quantity=quantity,
            price=price,
            timestamp=timestamp,
            pilot_id=pilot_id,
        )
    except Exception as e:
        logger.error(f"Error normalizing Alpaca data: {e}")
        raise ValueError(f"Invalid webhook data format: {e}")

def publish_to_kafka(producer: KafkaProducer, trade_data: NormalizedTrade) -> bool:
    """
    Publish normalized trade data to Kafka
    
    Args:
        producer: Kafka producer instance
        trade_data: Normalized trade data
        
    Returns:
        True if successful, False otherwise
    """
    try:
        topic = "pilot_trades"
        key = trade_data.pilot_id
        
        # Convert to dict for JSON serialization
        message = trade_data.dict()
        
        # Send to Kafka
        future = producer.send(topic, key=key, value=message)
        record_metadata = future.get(timeout=10)
        
        logger.info(
            f"Published trade to Kafka: {trade_data.symbol} "
            f"{trade_data.side} {trade_data.quantity} @ {trade_data.price}"
        )
        
        return True
    except Exception as e:
        logger.error(f"Failed to publish to Kafka: {e}")
        return False

@app.get("/health", response_model=HealthResponse)
async def health_check(producer: KafkaProducer = Depends(get_kafka_producer)):
    """Health check endpoint"""
    try:
        # Test Kafka connection
        producer.metrics()
        kafka_connected = True
    except Exception:
        kafka_connected = False
    
    return HealthResponse(
        status="ok",
        timestamp=datetime.utcnow().isoformat(),
        kafka_connected=kafka_connected,
    )

@app.post("/webhook/alpaca")
async def alpaca_webhook(
    request: Request,
    producer: KafkaProducer = Depends(get_kafka_producer)
):
    """
    Receive Alpaca webhook and process trade data
    
    This endpoint receives webhooks from Alpaca when trades are executed,
    normalizes the data, and publishes to Kafka for further processing.
    """
    try:
        # Get raw webhook data
        webhook_data = await request.json()
        logger.info(f"Received Alpaca webhook: {webhook_data.get('event', 'unknown')}")
        
        # Validate webhook secret (in production)
        webhook_secret = os.getenv("ALPACA_WEBHOOK_SECRET")
        if webhook_secret:
            # Add webhook signature validation here
            pass
        
        # Normalize the data
        normalized_trade = normalize_alpaca_data(webhook_data)
        
        # Publish to Kafka
        success = publish_to_kafka(producer, normalized_trade)
        
        if success:
            return {
                "status": "success",
                "message": "Trade data processed and published to Kafka",
                "trade": normalized_trade.dict(),
            }
        else:
            raise HTTPException(
                status_code=500,
                detail="Failed to publish trade data to Kafka"
            )
            
    except ValueError as e:
        logger.error(f"Invalid webhook data: {e}")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Error processing webhook: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.post("/simulate/trade")
async def simulate_trade(
    trade_data: NormalizedTrade,
    producer: KafkaProducer = Depends(get_kafka_producer)
):
    """
    Simulate a trade for testing purposes
    
    This endpoint allows manual creation of trade data for testing
    the Kafka pipeline without requiring actual Alpaca webhooks.
    """
    try:
        success = publish_to_kafka(producer, trade_data)
        
        if success:
            return {
                "status": "success",
                "message": "Simulated trade published to Kafka",
                "trade": trade_data.dict(),
            }
        else:
            raise HTTPException(
                status_code=500,
                detail="Failed to publish simulated trade to Kafka"
            )
            
    except Exception as e:
        logger.error(f"Error simulating trade: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

if __name__ == "__main__":
    import uvicorn
    
    port = int(os.getenv("PORT", 8001))
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=port,
        reload=True,
        log_level="info",
    ) 