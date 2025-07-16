import { NavigatorScreenParams } from '@react-navigation/native';

// Root Stack Navigator Types
export type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  SignUp: undefined;
  LinkBroker: undefined;
  Tabs: undefined;
  PortfolioHoldings: { portfolioId: string } | undefined;
};

// Tab Navigator Types
export type TabParamList = {
  portfolios: undefined;
  build: undefined;
  dashboard: undefined;
  account: undefined;
};

// Screen-specific parameter types
export type PilotListParams = {
  pilotId?: string;
};

export type SlateBuilderParams = {
  slateId?: string;
};

export type DashboardParams = {
  userId?: string;
}; 