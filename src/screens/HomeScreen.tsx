import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { theme } from '../theme/theme';
import BalanceHeader from '../components/BalanceHeader';
import TransactionSheet from '../components/TransactionSheet';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.root}>
      <BalanceHeader amount="4,923.82" />
      <View style={{ flex: 1 }}>
        <TransactionSheet />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },
});

export default HomeScreen; 