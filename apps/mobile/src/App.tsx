import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import screens
import OnboardingScreen from './screens/OnboardingScreen';
import LinkBrokerScreen from './screens/LinkBrokerScreen';
import PilotListScreen from './screens/PilotListScreen';
import SlateBuilderScreen from './screens/SlateBuilderScreen';
import DashboardScreen from './screens/DashboardScreen';

// Import components
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';

// Import types
import { RootStackParamList, TabParamList } from './types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

// Create Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Tab Navigator
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2563EB',
        tabBarInactiveTintColor: '#6B7280',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E5E7EB',
        },
      }}
    >
      <Tab.Screen
        name="PilotList"
        component={PilotListScreen}
        options={{
          tabBarLabel: 'Pilots',
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="users" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="SlateBuilder"
        component={SlateBuilderScreen}
        options={{
          tabBarLabel: 'Build',
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="plus-square" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="bar-chart-2" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Simple Tab Icon Component
function TabIcon({ name, color, size }: { name: string; color: string; size: number }) {
  return (
    <Text style={{ color, fontSize: size }}>
      {name === 'users' && '👥'}
      {name === 'plus-square' && '➕'}
      {name === 'bar-chart-2' && '📊'}
    </Text>
  );
}

// Main App Component
function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <AuthProvider>
              <NavigationContainer>
                <Stack.Navigator
                  initialRouteName="Onboarding"
                  screenOptions={{
                    headerShown: false,
                  }}
                >
                  <Stack.Screen name="Onboarding" component={OnboardingScreen} />
                  <Stack.Screen name="LinkBroker" component={LinkBrokerScreen} />
                  <Stack.Screen name="MainTabs" component={TabNavigator} />
                </Stack.Navigator>
              </NavigationContainer>
            </AuthProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App; 