// Shared schemas and DTOs for the PACE copy-trading app
// Using both io-ts for runtime validation and zod for API validation

import * as t from 'io-ts';
import { z } from 'zod';

// ============================================================================
// Core Domain Types
// ============================================================================

// User entity
export const UserSchema = t.type({
  id: t.string,
  email: t.string,
  name: t.string,
  createdAt: t.string, // ISO date string
  updatedAt: t.string,
});

export const UserZod = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(1),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type User = t.TypeOf<typeof UserSchema>;

// Pilot entity (traders that users can follow)
export const PilotSchema = t.type({
  id: t.string,
  name: t.string,
  description: t.string,
  avatarUrl: t.union([t.string, t.null]),
  totalReturn: t.number, // 30-day return percentage
  followers: t.number,
  isActive: t.boolean,
  createdAt: t.string,
  updatedAt: t.string,
});

export const PilotZod = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  description: z.string(),
  avatarUrl: z.string().url().nullable(),
  totalReturn: z.number(),
  followers: z.number().int().min(0),
  isActive: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type Pilot = t.TypeOf<typeof PilotSchema>;

// Trade entity
export const TradeSchema = t.type({
  id: t.string,
  symbol: t.string,
  side: t.union([t.literal('buy'), t.literal('sell')]),
  quantity: t.number,
  price: t.number,
  timestamp: t.string,
  pilotId: t.string,
  status: t.union([
    t.literal('pending'),
    t.literal('filled'),
    t.literal('cancelled'),
    t.literal('rejected'),
  ]),
});

export const TradeZod = z.object({
  id: z.string().uuid(),
  symbol: z.string().min(1),
  side: z.enum(['buy', 'sell']),
  quantity: z.number().positive(),
  price: z.number().positive(),
  timestamp: z.string().datetime(),
  pilotId: z.string().uuid(),
  status: z.enum(['pending', 'filled', 'cancelled', 'rejected']),
});

export type Trade = t.TypeOf<typeof TradeSchema>;

// Slate entity (custom portfolio)
export const SlateSchema = t.type({
  id: t.string,
  name: t.string,
  userId: t.string,
  positions: t.array(t.type({
    symbol: t.string,
    weight: t.number, // percentage (0-100)
  })),
  totalValue: t.number,
  createdAt: t.string,
  updatedAt: t.string,
});

export const SlateZod = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  userId: z.string().uuid(),
  positions: z.array(z.object({
    symbol: z.string().min(1),
    weight: z.number().min(0).max(100),
  })),
  totalValue: z.number().positive(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type Slate = t.TypeOf<typeof SlateSchema>;

// Fill entity (executed trade)
export const FillSchema = t.type({
  id: t.string,
  tradeId: t.string,
  symbol: t.string,
  side: t.union([t.literal('buy'), t.literal('sell')]),
  quantity: t.number,
  price: t.number,
  timestamp: t.string,
  slippage: t.number, // percentage
  latency: t.number, // milliseconds
});

export const FillZod = z.object({
  id: z.string().uuid(),
  tradeId: z.string().uuid(),
  symbol: z.string().min(1),
  side: z.enum(['buy', 'sell']),
  quantity: z.number().positive(),
  price: z.number().positive(),
  timestamp: z.string().datetime(),
  slippage: z.number(),
  latency: z.number().positive(),
});

export type Fill = t.TypeOf<typeof FillSchema>;

// ============================================================================
// API Request/Response Types
// ============================================================================

// Follow pilot request
export const FollowPilotRequestZod = z.object({
  pilotId: z.string().uuid(),
});

export type FollowPilotRequest = z.infer<typeof FollowPilotRequestZod>;

// Create slate request
export const CreateSlateRequestZod = z.object({
  name: z.string().min(1).max(100),
  positions: z.array(z.object({
    symbol: z.string().min(1),
    weight: z.number().min(0).max(100),
  })).min(1),
});

export type CreateSlateRequest = z.infer<typeof CreateSlateRequestZod>;

// Risk estimation request
export const RiskEstimateRequestZod = z.object({
  positions: z.array(z.object({
    symbol: z.string(),
    weight: z.number().min(0).max(100),
  })),
  timeHorizon: z.number().min(1).max(30), // days
});

export type RiskEstimateRequest = z.infer<typeof RiskEstimateRequestZod>;

// Risk estimation response
export const RiskEstimateResponseZod = z.object({
  var: z.number(), // Value at Risk (1-day)
  beta: z.number(), // Portfolio beta
  sharpeRatio: z.number(),
  maxDrawdown: z.number(),
});

export type RiskEstimateResponse = z.infer<typeof RiskEstimateResponseZod>;

// ============================================================================
// WebSocket Event Types
// ============================================================================

export const WebSocketEventSchema = t.union([
  t.type({
    type: t.literal('fill'),
    data: FillSchema,
  }),
  t.type({
    type: t.literal('pnl_update'),
    data: t.type({
      userId: t.string,
      totalPnL: t.number,
      dailyPnL: t.number,
      timestamp: t.string,
    }),
  }),
  t.type({
    type: t.literal('trade'),
    data: TradeSchema,
  }),
]);

export type WebSocketEvent = t.TypeOf<typeof WebSocketEventSchema>;

// ============================================================================
// Utility Functions
// ============================================================================

export const validateUser = (data: unknown): User => {
  return UserSchema.decode(data).getOrElseL(() => {
    throw new Error('Invalid user data');
  });
};

export const validatePilot = (data: unknown): Pilot => {
  return PilotSchema.decode(data).getOrElseL(() => {
    throw new Error('Invalid pilot data');
  });
};

export const validateTrade = (data: unknown): Trade => {
  return TradeSchema.decode(data).getOrElseL(() => {
    throw new Error('Invalid trade data');
  });
};

// All schemas are already exported above 