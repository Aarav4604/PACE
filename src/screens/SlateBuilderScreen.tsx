import React, { useRef } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { theme } from '../theme/theme';
import { useSlateStore } from '../store/slateStore';
import Slider from '@react-native-community/slider';
import Haptic from 'react-native-haptic-feedback';

function calculateVaR(positions: { weight: number }[]) {
  // Stub: VaR is just sum of weights * 0.01 for demo
  return (positions.reduce((acc, p) => acc + p.weight, 0) * 0.01).toFixed(2);
}

const SlateBuilderScreen = () => {
  const positions = useSlateStore((s) => s.positions);
  const updateWeight = useSlateStore((s) => s.updateWeight);

  // Handler for haptic feedback on slider release
  const handleSlidingComplete = () => {
    Haptic.trigger('impactMedium');
  };

  const varValue = calculateVaR(positions);

  return (
    <View style={styles.root}>
      <Text style={styles.heading}>My Slate</Text>
      <FlatList
        data={positions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.positionRow}>
            <Text style={styles.positionName}>{item.name}</Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={100}
              step={1}
              value={item.weight}
              minimumTrackTintColor={theme.colors.accent}
              maximumTrackTintColor={theme.colors.card}
              thumbTintColor={theme.colors.accent}
              onValueChange={(value) => updateWeight(item.id, value)}
              onSlidingComplete={handleSlidingComplete}
            />
            <Text style={styles.weight}>{item.weight}%</Text>
          </View>
        )}
        style={{ width: '100%' }}
        contentContainerStyle={{ padding: theme.spacing(4) }}
      />
      <View style={styles.varBadge}>
        <Text style={styles.varLabel}>VaR</Text>
        <Text style={styles.varValue}>{varValue}%</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.bg,
    paddingTop: theme.spacing(8),
  },
  heading: {
    color: theme.colors.textPrimary,
    fontSize: 24,
    fontWeight: '600',
    marginLeft: theme.spacing(4),
    marginBottom: theme.spacing(2),
  },
  positionRow: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.card,
    padding: theme.spacing(4),
    marginBottom: theme.spacing(3),
    flexDirection: 'row',
    alignItems: 'center',
  },
  positionName: {
    color: theme.colors.textPrimary,
    fontSize: 16,
    fontWeight: '500',
    width: 60,
  },
  slider: {
    flex: 1,
    marginHorizontal: theme.spacing(2),
  },
  weight: {
    color: theme.colors.accent,
    fontWeight: '600',
    fontSize: 16,
    width: 50,
    textAlign: 'right',
  },
  varBadge: {
    position: 'absolute',
    right: theme.spacing(4),
    bottom: theme.spacing(8),
    backgroundColor: theme.colors.card,
    borderRadius: 20,
    paddingVertical: theme.spacing(2),
    paddingHorizontal: theme.spacing(5),
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  varLabel: {
    color: theme.colors.textSecondary,
    fontSize: 14,
    marginRight: theme.spacing(2),
  },
  varValue: {
    color: theme.colors.accent,
    fontSize: 18,
    fontWeight: '700',
  },
});

export default SlateBuilderScreen; 