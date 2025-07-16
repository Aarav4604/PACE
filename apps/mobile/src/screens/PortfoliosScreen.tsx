import React from 'react';
import { View, FlatList } from 'react-native';

const PortfoliosScreen = () => (
  <View style={{ flex: 1 }}>
    <FlatList data={[]} renderItem={null} keyExtractor={() => ''} />
  </View>
);

export default PortfoliosScreen; 