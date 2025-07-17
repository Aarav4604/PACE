import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { LogBox } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Text } from 'react-native';
import { setJSExceptionHandler } from 'react-native-exception-handler';
import { DevSettings } from 'react-native';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import { useContext } from 'react';

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
import SignInScreen from '@/screens/SignInScreen';

// Import components
import { ThemeProvider } from './contexts/ThemeContext';
import { AppErrorBoundary } from '@/components/AppErrorBoundary';

// Import types
import { RootStackParamList } from './types/navigation';

// FloatingTabNavigator stub (to be implemented)
import FloatingTabNavigator from '@/components/FloatingTabNavigator';

const AuthStack = createNativeStackNavigator();
const AppStack = createNativeStackNavigator();

// Create Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function AuthGate() {
  const { isAuthenticated } = useContext(AuthContext);
  if (!isAuthenticated) {
    return (
      <AuthStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="SignIn">
        <AuthStack.Screen name="Onboarding" component={OnboardingScreen} />
        <AuthStack.Screen name="SignIn" component={SignInScreen} />
        <AuthStack.Screen name="SignUp" component={SignUpScreen} />
        <AuthStack.Screen name="Login" component={LoginScreen} />
      </AuthStack.Navigator>
    );
  }
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="Tabs" component={FloatingTabNavigator} />
    </AppStack.Navigator>
  );
}

// Main App Component
function App() {
  LogBox.ignoreAllLogs(false); // show warnings
  console.log('🔹 App.tsx executed'); // sanity ping
  setJSExceptionHandler((e) => {
    console.error('Unhandled JS Exception ➜', e);
  }, true);

  console.log('App mounted ✅');

  // Disable RN Inspector overlay in dev menu
  if (DevSettings && DevSettings.addMenuItem) {
    DevSettings.addMenuItem('Disable Inspector', () => {});
  }

  return (
    <AppErrorBoundary>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider>
              <AuthProvider>
                <NavigationContainer>
                  <AuthGate />
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