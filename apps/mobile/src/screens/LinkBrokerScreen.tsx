import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Alert, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { darkTheme as theme } from '../theme/theme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

const brokers = [
  {
    id: 'robinhood',
    name: 'Robinhood',
    logoUri: 'https://logo.clearbit.com/robinhood.com',
    primaryColor: '#00C805',
  },
  {
    id: 'etrade',
    name: 'E*TRADE',
    logoUri: 'https://logo.clearbit.com/etrade.com',
    primaryColor: '#5C068C',
  },
  {
    id: 'fidelity',
    name: 'Fidelity',
    logoUri: 'https://logo.clearbit.com/fidelity.com',
    primaryColor: '#007A3D',
  },
  {
    id: 'schwab',
    name: 'Charles Schwab',
    logoUri: 'https://logo.clearbit.com/schwab.com',
    primaryColor: '#2795D9',
  },
];

function BrokerTile({ name, logoUri, primaryColor, onConnect, loading }: {
  name: string;
  logoUri: string;
  primaryColor: string;
  onConnect: () => void;
  loading: boolean;
}) {
  const [loadFailed, setLoadFailed] = useState(false);
  return (
    <TouchableOpacity style={styles.tile} onPress={onConnect} disabled={loading}>
      {!loadFailed ? (
        <Image
          source={{ uri: logoUri }}
          style={styles.avatar}
          onError={() => setLoadFailed(true)}
        />
      ) : (
        <View style={[styles.avatar, { backgroundColor: primaryColor, justifyContent: 'center', alignItems: 'center' }]}> 
          <Text style={styles.initial}>{name[0]}</Text>
        </View>
      )}
      <Text style={styles.label}>{name}</Text>
      <View style={{ flex: 1 }} />
      <View style={styles.connectBtn}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.connectText}>Connect</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default function LinkBrokerScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleConnect = (brokerName: string, brokerId: string) => {
    setLoadingId(brokerId);
    setTimeout(() => {
      setLoadingId(null);
      Alert.alert('Success', `Connected to ${brokerName}!`, [
        { text: 'Continue', onPress: () => navigation.navigate({ name: 'MainTabs', params: { screen: 'Dashboard' } }) },
      ]);
    }, 1200);
  };

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Link Your Broker</Text>
      <Text style={styles.subtitle}>Connect your brokerage account to get started</Text>
      <FlatList
        data={brokers}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <BrokerTile
            name={item.name}
            logoUri={item.logoUri}
            primaryColor={item.primaryColor}
            onConnect={() => handleConnect(item.name, item.id)}
            loading={loadingId === item.id}
          />
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
      <TouchableOpacity style={styles.skipBtn} onPress={() => navigation.navigate({ name: 'MainTabs', params: { screen: 'Dashboard' } })}>
        <Text style={styles.skipText}>Skip for now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: 60,
    alignItems: 'center',
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: 16,
    marginBottom: 24,
  },
  list: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 24,
  },
  tile: {
    backgroundColor: theme.colors.card,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    marginBottom: 16,
    width: '90%',
    shadowColor: theme.colors.shadow,
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    marginRight: 18,
    backgroundColor: '#eee',
  } as import('react-native').ImageStyle,
  initial: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  label: {
    color: theme.colors.textPrimary,
    fontSize: 18,
    fontWeight: '600',
  },
  connectBtn: {
    backgroundColor: theme.colors.accent,
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 22,
    marginLeft: 12,
  },
  connectText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  skipBtn: {
    marginTop: 24,
  },
  skipText: {
    color: theme.colors.accent,
    fontSize: 16,
    fontWeight: '600',
  },
}); 