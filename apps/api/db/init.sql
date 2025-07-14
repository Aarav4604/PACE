-- PACE Database Initialization Script
-- Creates tables and sample data for the copy-trading platform

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE trade_side AS ENUM ('buy', 'sell');
CREATE TYPE trade_status AS ENUM ('pending', 'filled', 'cancelled', 'rejected');

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    avatar_url VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Pilots table (traders that users can follow)
CREATE TABLE IF NOT EXISTS pilots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    avatar_url VARCHAR(500),
    total_return DECIMAL(10,2) DEFAULT 0,
    followers INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Slates table (custom portfolios)
CREATE TABLE IF NOT EXISTS slates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    positions JSONB NOT NULL DEFAULT '[]',
    total_value DECIMAL(15,2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Trades table
CREATE TABLE IF NOT EXISTS trades (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    symbol VARCHAR(20) NOT NULL,
    side trade_side NOT NULL,
    quantity DECIMAL(15,2) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    pilot_id UUID NOT NULL REFERENCES pilots(id) ON DELETE CASCADE,
    status trade_status DEFAULT 'pending',
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Fills table (executed trades)
CREATE TABLE IF NOT EXISTS fills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    trade_id UUID NOT NULL REFERENCES trades(id) ON DELETE CASCADE,
    symbol VARCHAR(20) NOT NULL,
    side trade_side NOT NULL,
    quantity DECIMAL(15,2) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    slippage DECIMAL(5,2) DEFAULT 0,
    latency INTEGER DEFAULT 0,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_pilots_active ON pilots(is_active);
CREATE INDEX IF NOT EXISTS idx_slates_user_id ON slates(user_id);
CREATE INDEX IF NOT EXISTS idx_trades_pilot_id ON trades(pilot_id);
CREATE INDEX IF NOT EXISTS idx_trades_symbol ON trades(symbol);
CREATE INDEX IF NOT EXISTS idx_trades_timestamp ON trades(timestamp);
CREATE INDEX IF NOT EXISTS idx_fills_trade_id ON fills(trade_id);
CREATE INDEX IF NOT EXISTS idx_fills_timestamp ON fills(timestamp);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pilots_updated_at BEFORE UPDATE ON pilots
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_slates_updated_at BEFORE UPDATE ON slates
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data

-- Sample users
INSERT INTO users (id, email, name, avatar_url) VALUES
    ('550e8400-e29b-41d4-a716-446655440001', 'john@example.com', 'John Doe', 'https://example.com/avatars/john.jpg'),
    ('550e8400-e29b-41d4-a716-446655440002', 'jane@example.com', 'Jane Smith', 'https://example.com/avatars/jane.jpg'),
    ('550e8400-e29b-41d4-a716-446655440003', 'bob@example.com', 'Bob Johnson', 'https://example.com/avatars/bob.jpg')
ON CONFLICT (id) DO NOTHING;

-- Sample pilots
INSERT INTO pilots (id, name, description, avatar_url, total_return, followers, is_active) VALUES
    ('660e8400-e29b-41d4-a716-446655440001', 'Tesla Trader', 'Specializes in Tesla and EV stocks with high conviction trades', 'https://example.com/avatars/tesla-trader.jpg', 15.7, 1250, true),
    ('660e8400-e29b-41d4-a716-446655440002', 'Tech Guru', 'Technology sector expert with focus on AI and semiconductor stocks', 'https://example.com/avatars/tech-guru.jpg', 22.3, 2100, true),
    ('660e8400-e29b-41d4-a716-446655440003', 'ETF Master', 'Diversified ETF portfolio with low volatility approach', 'https://example.com/avatars/etf-master.jpg', 8.9, 850, true)
ON CONFLICT (id) DO NOTHING;

-- Sample slates
INSERT INTO slates (id, name, user_id, positions, total_value) VALUES
    ('770e8400-e29b-41d4-a716-446655440001', 'My Tech Portfolio', '550e8400-e29b-41d4-a716-446655440001', 
     '[{"symbol": "TSLA", "weight": 40}, {"symbol": "NVDA", "weight": 30}, {"symbol": "AAPL", "weight": 30}]', 50000.00),
    ('770e8400-e29b-41d4-a716-446655440002', 'Conservative Mix', '550e8400-e29b-41d4-a716-446655440002',
     '[{"symbol": "VTI", "weight": 60}, {"symbol": "BND", "weight": 40}]', 75000.00)
ON CONFLICT (id) DO NOTHING;

-- Sample trades
INSERT INTO trades (id, symbol, side, quantity, price, pilot_id, status, timestamp) VALUES
    ('880e8400-e29b-41d4-a716-446655440001', 'TSLA', 'buy', 100, 250.50, '660e8400-e29b-41d4-a716-446655440001', 'filled', CURRENT_TIMESTAMP - INTERVAL '2 hours'),
    ('880e8400-e29b-41d4-a716-446655440002', 'NVDA', 'buy', 50, 450.75, '660e8400-e29b-41d4-a716-446655440002', 'filled', CURRENT_TIMESTAMP - INTERVAL '1 hour'),
    ('880e8400-e29b-41d4-a716-446655440003', 'AAPL', 'sell', 75, 175.25, '660e8400-e29b-41d4-a716-446655440001', 'pending', CURRENT_TIMESTAMP - INTERVAL '30 minutes')
ON CONFLICT (id) DO NOTHING;

-- Sample fills
INSERT INTO fills (id, trade_id, symbol, side, quantity, price, slippage, latency, timestamp) VALUES
    ('990e8400-e29b-41d4-a716-446655440001', '880e8400-e29b-41d4-a716-446655440001', 'TSLA', 'buy', 100, 250.50, 0.1, 150, CURRENT_TIMESTAMP - INTERVAL '2 hours'),
    ('990e8400-e29b-41d4-a716-446655440002', '880e8400-e29b-41d4-a716-446655440002', 'NVDA', 'buy', 50, 450.75, 0.05, 120, CURRENT_TIMESTAMP - INTERVAL '1 hour')
ON CONFLICT (id) DO NOTHING;

-- Create views for common queries

-- Pilot performance view
CREATE OR REPLACE VIEW pilot_performance AS
SELECT 
    p.id,
    p.name,
    p.description,
    p.avatar_url,
    p.total_return,
    p.followers,
    COUNT(t.id) as total_trades,
    COUNT(CASE WHEN t.status = 'filled' THEN 1 END) as filled_trades,
    AVG(CASE WHEN t.status = 'filled' THEN t.price END) as avg_trade_price,
    MAX(t.timestamp) as last_trade_time
FROM pilots p
LEFT JOIN trades t ON p.id = t.pilot_id
WHERE p.is_active = true
GROUP BY p.id, p.name, p.description, p.avatar_url, p.total_return, p.followers;

-- User portfolio view
CREATE OR REPLACE VIEW user_portfolio AS
SELECT 
    u.id as user_id,
    u.name as user_name,
    s.id as slate_id,
    s.name as slate_name,
    s.positions,
    s.total_value,
    s.created_at as slate_created,
    s.updated_at as slate_updated
FROM users u
LEFT JOIN slates s ON u.id = s.user_id;

-- Trade summary view
CREATE OR REPLACE VIEW trade_summary AS
SELECT 
    t.id,
    t.symbol,
    t.side,
    t.quantity,
    t.price,
    t.status,
    t.timestamp,
    p.name as pilot_name,
    f.slippage,
    f.latency
FROM trades t
JOIN pilots p ON t.pilot_id = p.id
LEFT JOIN fills f ON t.id = f.trade_id
ORDER BY t.timestamp DESC;

-- Grant permissions
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO pace_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO pace_user;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO pace_user; 