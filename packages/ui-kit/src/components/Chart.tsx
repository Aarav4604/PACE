import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import {
  VictoryChart,
  VictoryLine,
  VictoryArea,
  VictoryAxis,
  VictoryTheme,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from 'victory-native';
import { Theme, getTheme } from '../theme';

const { width } = Dimensions.get('window');

export interface DataPoint {
  x: number | string;
  y: number;
}

export interface ChartProps {
  data: DataPoint[];
  type?: 'line' | 'area';
  height?: number;
  width?: number;
  color?: string;
  showGrid?: boolean;
  showTooltip?: boolean;
  theme?: Theme;
  title?: string;
}

export const Chart: React.FC<ChartProps> = ({
  data,
  type = 'line',
  height = 200,
  width: chartWidth = width - 32,
  color,
  showGrid = true,
  showTooltip = false,
  theme = getTheme('light'),
  title,
}) => {
  const chartColor = color || theme.colors.primary;
  const gridColor = theme.colors.border;

  const ChartComponent = type === 'area' ? VictoryArea : VictoryLine;

  return (
    <View style={[styles.container, { height, width: chartWidth }]}>
      <VictoryChart
        width={chartWidth}
        height={height}
        theme={VictoryTheme.material}
        containerComponent={
          showTooltip
            ? <VictoryVoronoiContainer
                labels={({ datum }) => `${datum.y}`}
                labelComponent={<VictoryTooltip />}
              />
            : undefined
        }
        padding={{ top: 20, bottom: 40, left: 50, right: 20 }}
      >
        {showGrid && (
          <VictoryAxis
            dependentAxis
            style={{
              axis: { stroke: gridColor },
              grid: { stroke: gridColor, strokeDasharray: '5,5' },
              tickLabels: { fill: theme.colors.textSecondary, fontSize: 10 },
            }}
          />
        )}
        
        <VictoryAxis
          style={{
            axis: { stroke: gridColor },
            tickLabels: { fill: theme.colors.textSecondary, fontSize: 10 },
          }}
        />
        
        <ChartComponent
          data={data}
          style={{
            data: {
              stroke: chartColor,
              fill: type === 'area' ? chartColor : undefined,
              fillOpacity: type === 'area' ? 0.3 : undefined,
              strokeWidth: 2,
            },
          }}
          animate={{
            duration: 1000,
            onLoad: { duration: 500 },
          }}
        />
      </VictoryChart>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 