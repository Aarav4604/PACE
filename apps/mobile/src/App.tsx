import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { LogBox } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { setJSExceptionHandler } from 'react-native-exception-handler';
import { DevSettings } from 'react-native';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import { useContext } from 'react';

// Import components
import { ThemeProvider } from './contexts/ThemeContext';
import { AppErrorBoundary } from './components/AppErrorBoundary';

// Import navigation
import AppNavigator from './navigation/AppNavigator';

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
  return <AppNavigator authed={isAuthenticated} />;
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