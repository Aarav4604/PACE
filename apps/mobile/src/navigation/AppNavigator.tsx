import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FloatingNavBar from '../components/FloatingNavBar';
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
      tabBar={props => <FloatingNavBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="Home" component={HomeScreen} />
      <Tabs.Screen name="Portfolios" component={PortfoliosScreen} />
      <Tabs.Screen name="Account" component={AccountScreen} />
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