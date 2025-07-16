import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export class AppErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { error?: Error }
> {
  state = { error: undefined };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(err: Error, info: any) {
    console.error('💥 Uncaught error:', err, info);
  }

  render() {
    if (this.state.error) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Something went wrong</Text>
          <Text selectable style={styles.msg}>{String(this.state.error)}</Text>
        </View>
      );
    }
    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  title: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  msg: { fontSize: 12, color: '#555' },
}); 