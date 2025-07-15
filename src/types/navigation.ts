import { NavigatorScreenParams } from '@react-navigation/native';

// Root Stack Navigator Types
export type RootStackParamList = {
  Onboarding: undefined;
  LinkBroker: undefined;
  MainTabs: NavigatorScreenParams<TabParamList>;
};

// Tab Navigator Types
export type TabParamList = {
  PilotList: undefined;
  SlateBuilder: undefined;
  Dashboard: undefined;
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