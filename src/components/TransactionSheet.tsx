import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedGestureHandler, useAnimatedStyle } from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { FlashList } from '@shopify/flash-list';
import { BlurView } from '@react-native-community/blur';
import { theme } from '../theme/theme';

const SHEET_MIN = 120;
const SHEET_MAX = 500;
const DATA = [
  { id: 1, title: 'Starbucks', subtitle: 'Food & Drink', amount: -5.75 },
  { id: 2, title: 'PayPal', subtitle: 'Transfers', amount: 50.0 },
  { id: 3, title: 'Walmart', subtitle: 'Groceries', amount: -45.23 },
  { id: 4, title: 'Netflix', subtitle: 'Entertainment', amount: -15.99 },
  { id: 5, title: 'Apple Store', subtitle: 'Electronics', amount: -199.0 },
  { id: 6, title: 'Uber', subtitle: 'Transportation', amount: -12.4 },
  { id: 7, title: 'Airbnb', subtitle: 'Travel', amount: -250.0 },
];

function clamp(val: number, min: number, max: number) {
  'worklet';
  return Math.max(min, Math.min(val, max));
}

const TxRow = ({ title, subtitle, amount }: { title: string; subtitle: string; amount: number }) => (
  <BlurView style={styles.txRow} blurAmount={10} blurType="dark">
    <Animated.Text style={styles.txTitle}>{title}</Animated.Text>
    <Animated.Text style={styles.txSubtitle}>{subtitle}</Animated.Text>
    <Animated.Text style={[styles.txAmount, amount > 0 ? styles.positive : styles.negative]}>
      {amount > 0 ? `+$${amount.toFixed(2)}` : `-$${Math.abs(amount).toFixed(2)}`}
    </Animated.Text>
  </BlurView>
);

const TransactionSheet = () => {
  const translateY = useSharedValue(SHEET_MIN);

  const pan = useAnimatedGestureHandler({
    onActive: (e) => {
      translateY.value = clamp(e.translationY + SHEET_MIN, SHEET_MIN, SHEET_MAX);
    },
  });

  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    borderTopLeftRadius: theme.radius.sheet,
    borderTopRightRadius: theme.radius.sheet,
  }));

  return (
    <PanGestureHandler onGestureEvent={pan}>
      <Animated.View style={[styles.sheet, style]}>
        <FlashList
          data={DATA}
          renderItem={({ item }) => <TxRow {...item} />}
          estimatedItemSize={60}
        />
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.card,
    paddingTop: theme.spacing(4),
    paddingHorizontal: theme.spacing(2),
    minHeight: SHEET_MIN,
    maxHeight: SHEET_MAX,
    borderTopLeftRadius: theme.radius.sheet,
    borderTopRightRadius: theme.radius.sheet,
    overflow: 'hidden',
  },
  txRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing(3),
    paddingHorizontal: theme.spacing(2),
    marginBottom: theme.spacing(1),
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: theme.radius.card,
  },
  txTitle: {
    color: theme.colors.textPrimary,
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  txSubtitle: {
    color: theme.colors.textSecondary,
    fontSize: 14,
    flex: 1,
  },
  txAmount: {
    fontSize: 16,
    fontWeight: '600',
    minWidth: 80,
    textAlign: 'right',
  },
  positive: {
    color: theme.colors.success,
  },
  negative: {
    color: theme.colors.danger,
  },
});

export default TransactionSheet; 