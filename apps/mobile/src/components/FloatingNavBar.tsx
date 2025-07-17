import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
const FontAwesome5 = require('react-native-vector-icons/FontAwesome5').default;

export default function FloatingNavBar({ state, descriptors, navigation }) {
  const icons = [
    { name: 'home', label: 'Home' },
    { name: 'gem', label: 'Portfolios' },
    { name: 'th', label: 'Account' },
  ];
  return (
    <View style={styles.wrapper}>
      <View style={styles.bar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
          const icon = icons[index]?.name || 'question';
          const color = isFocused ? '#FFFFFF' : '#9CA3AF';
          return (
            <TouchableOpacity
              key={route.key}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              accessibilityRole="button"
              style={styles.btn}
              onPress={() => {
                if (!isFocused) navigation.navigate(route.name);
              }}
            >
              <FontAwesome5 name={icon} size={20} color={color} />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // outer wrapper supplies deep shadow
  wrapper: {
    position: 'absolute',
    bottom: 32,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 24,
  },
  // pill itself
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingVertical: 10,
    borderRadius: 40,                    // fully round
    backgroundColor: 'rgba(0,0,0,0.85)', // translucent
    overflow: 'hidden',
  },
  btn: {
    marginHorizontal: 16,
    padding: 12,                         // 44 px hit-area
  },
}); 