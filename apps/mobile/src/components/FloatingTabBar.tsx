import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { Home, Plus, BarChart4, User } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';

const tabs = [
  { key: 'portfolios', icon: Home },
  { key: 'build', icon: Plus },
  { key: 'dashboard', icon: BarChart4 },
  { key: 'account', icon: User },
];

const FloatingTabBar = React.memo(({ state, navigation }: BottomTabBarProps) => {
  const { bottom } = useSafeAreaInsets();
  const onPress = React.useCallback((route: string) => {
    navigation.navigate(route as never);
  }, [navigation]);

  return (
    <View pointerEvents="box-none" style={[StyleSheet.absoluteFill, { justifyContent: 'flex-end', alignItems: 'center' }]}> 
      <BlurView style={[styles.wrap, { marginBottom: bottom + 12 }]} blurType="dark" blurAmount={16} reducedTransparencyFallbackColor="rgba(0,0,0,0.55)">
        {tabs.map((t, idx) => {
          const Icon = t.icon;
          const focused = state.index === idx;
          return (
            <TouchableOpacity
              key={t.key}
              style={styles.btn}
              onPress={() => onPress(t.key)}
              activeOpacity={0.8}
            >
              <Icon size={20} color={focused ? '#fff' : '#6B7280'} />
            </TouchableOpacity>
          );
        })}
      </BlurView>
    </View>
  );
});

export default FloatingTabBar;

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.55)',
    borderRadius: 36,
    paddingHorizontal: 24,
    paddingVertical: 14,
    gap: 28,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
  btn: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
}); 