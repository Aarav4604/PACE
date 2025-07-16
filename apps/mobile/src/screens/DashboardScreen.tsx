import React from 'react';
import { View, Text } from 'react-native';

const DashboardScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Portfolio Value: $100,000</Text>
      <Text>30-day P&L: [sparkline]</Text>
      <Text>KPI: Total Return: 12%</Text>
      <Text>KPI: Max Drawdown: -8%</Text>
      <Text>KPI: Beta: 1.2</Text>
    </View>
  );
};

export default DashboardScreen; 