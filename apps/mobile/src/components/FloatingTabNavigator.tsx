import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PortfoliosScreen from '@/screens/PortfoliosScreen';
import BuildScreen from '@/screens/BuildScreen';
import DashboardScreen from '@/screens/DashboardScreen';
import AccountScreen from '@/screens/AccountScreen';
import { TabParamList } from '@/types/navigation';
import FloatingTabBar from './FloatingTabBar';

const Tab = createBottomTabNavigator<TabParamList>();

const FloatingTabNavigator = () => (
  <Tab.Navigator
    tabBar={(props) => <FloatingTabBar {...props} />}
    screenOptions={{ headerShown: false }}
  >
    <Tab.Screen name="portfolios" component={PortfoliosScreen} options={{ tabBarLabel: 'Portfolios' }} />
    <Tab.Screen name="build" component={BuildScreen} options={{ tabBarLabel: 'Build' }} />
    <Tab.Screen name="dashboard" component={DashboardScreen} options={{ tabBarLabel: 'Dashboard' }} />
    <Tab.Screen name="account" component={AccountScreen} options={{ tabBarLabel: 'Account' }} />
  </Tab.Navigator>
);

export default FloatingTabNavigator; 