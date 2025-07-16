import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { LogBox } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Text } from 'react-native';
import { setJSExceptionHandler } from 'react-native-exception-handler';

// Import screens
import OnboardingScreen from '@/screens/OnboardingScreen';
import LinkBrokerScreen from '@/screens/LinkBrokerScreen';
import LoginScreen from '@/screens/LoginScreen';
import SignUpScreen from '@/screens/SignUpScreen';
import DashboardScreen from '@/screens/DashboardScreen';
// New screens for portfolios
import PortfolioHoldingsScreen from '@/screens/PortfolioHoldingsScreen';
import PortfoliosScreen from '@/screens/PortfoliosScreen';
import BuildScreen from '@/screens/BuildScreen';
import AccountScreen from '@/screens/AccountScreen';

// Import components
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { AppErrorBoundary } from '@/components/AppErrorBoundary';

// Import types
import { RootStackParamList } from './types/navigation';

// FloatingTabNavigator stub (to be implemented)
import FloatingTabNavigator from '@/components/FloatingTabNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

// Create Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Main App Component
function App() {
  LogBox.ignoreAllLogs(false); // show warnings
  console.log('🔹 App.tsx executed'); // sanity ping
  setJSExceptionHandler((e) => {
    console.error('Unhandled JS Exception ➜', e);
  }, true);

  console.log('App mounted ✅');

  return (
    <AppErrorBoundary>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider>
              <AuthProvider>
                <NavigationContainer>
                  <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Portfolios">
                    <Stack.Screen name="Tabs" component={FloatingTabNavigator} />
                    <Stack.Screen name="PortfolioHoldings" component={PortfolioHoldingsScreen} />
                  </Stack.Navigator>
                </NavigationContainer>
              </AuthProvider>
            </ThemeProvider>
          </QueryClientProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </AppErrorBoundary>
  );
}

export default App; 