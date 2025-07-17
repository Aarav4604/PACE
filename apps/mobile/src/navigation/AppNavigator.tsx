import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { default as Icon } from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import PortfoliosScreen from '../screens/PortfoliosScreen';
import AccountScreen from '../screens/AccountScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import LoginScreen from '../screens/LoginScreen';

const Auth = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

function FloatingTabs() {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 40,
          left: 24,
          right: 24,
          borderRadius: 48,
          backgroundColor: '#000',
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.15)',
          height: 64,
          shadowColor: '#000',
          shadowOpacity: 0.25,
          shadowRadius: 20,
          shadowOffset: { width: 0, height: 4 },
          elevation: 8,
        },
      }}>
      <Tabs.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            React.createElement(Icon as any, { 
              name: focused ? "home" : "home-outline", 
              size: 24, 
              color: focused ? "#007AFF" : "#8b8b8b" 
            })
          ),
        }}
      />
      <Tabs.Screen 
        name="Portfolios" 
        component={PortfoliosScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            React.createElement(Icon as any, { 
              name: focused ? "pie-chart" : "pie-chart-outline", 
              size: 24, 
              color: focused ? "#007AFF" : "#8b8b8b" 
            })
          ),
        }}
      />
      <Tabs.Screen 
        name="Account" 
        component={AccountScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            React.createElement(Icon as any, { 
              name: focused ? "person" : "person-outline", 
              size: 24, 
              color: focused ? "#007AFF" : "#8b8b8b" 
            })
          ),
        }}
      />
    </Tabs.Navigator>
  );
}

export default function AppNavigator({ authed }: { authed: boolean }) {
  if (!authed) {
    return (
      <Auth.Navigator screenOptions={{ headerShown: false, animation: 'fade_from_bottom' }}>
        <Auth.Screen name="SignIn" component={SignInScreen} />
        <Auth.Screen name="SignUp" component={SignUpScreen} />
        <Auth.Screen name="Login" component={LoginScreen} />
      </Auth.Navigator>
    );
  }
  return <FloatingTabs />;
} 