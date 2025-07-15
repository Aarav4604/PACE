import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { VictoryLine, VictoryChart, VictoryTheme } from 'victory-native';
import { theme } from '../theme/theme';

function useLivePnL() {
  const [data, setData] = useState<{ x: number; y: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setLoading(true);
    setData([]);
    let x = 0;
    intervalRef.current = setInterval(() => {
      setData((prev) => {
        const next = [...prev, { x, y: Math.round(Math.random() * 100) }];
        x++;
        return next.slice(-20); // keep last 20 points
      });
      setLoading(false);
    }, 2000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return { data, loading };
}

const Shimmer = () => (
  <View style={styles.shimmerWrap}>
    <View style={styles.shimmerBar} />
    <View style={styles.shimmerBar} />
    <View style={styles.shimmerBar} />
  </View>
);

const DashboardScreen = () => {
  const { data, loading } = useLivePnL();

  return (
    <View style={styles.root}>
      <Text style={styles.heading}>Live P&L</Text>
      {loading ? (
        <Shimmer />
      ) : (
        <VictoryChart theme={VictoryTheme.material} height={220} width={350}>
          <VictoryLine
            data={data}
            style={{ data: { stroke: theme.colors.accent, strokeWidth: 3 } }}
            interpolation="monotoneX"
          />
        </VictoryChart>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.bg,
    paddingTop: theme.spacing(8),
    alignItems: 'center',
  },
  heading: {
    color: theme.colors.textPrimary,
    fontSize: 24,
    fontWeight: '600',
    marginBottom: theme.spacing(4),
  },
  shimmerWrap: {
    width: 350,
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shimmerBar: {
    width: 300,
    height: 20,
    backgroundColor: theme.colors.card,
    borderRadius: 10,
    marginVertical: 10,
    opacity: 0.5,
  },
});

export default DashboardScreen; 