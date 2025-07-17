import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  UIManager,
  LayoutAnimation,
} from 'react-native';
import { AuthContext } from '../contexts/AuthContext';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function HomeScreen() {
  const { user } = useContext(AuthContext);
  const name = user?.name?.trim() || 'NAME';
  const [open, setOpen] = useState(false);

  const toggle = () => {
    LayoutAnimation.easeInEaseOut();
    setOpen((prev) => !prev);
  };

  return (
    <View style={styles.root}>
      <Text style={styles.welcome}>Welcome, {name} 👋</Text>
      <View style={styles.moneySummary}>
        <Text style={styles.h1}>$0.00</Text>
        <Text style={styles.gain}>+$0.00 (+0.0 %)</Text>
      </View>
      <View style={styles.cardShadowWrap}>
        <TouchableOpacity style={styles.folder} activeOpacity={0.9} onPress={toggle}>
          <View style={styles.folderHeader}>
            <Text style={styles.amount}>—</Text>
            <Text style={styles.folderTitle}>Unknown</Text>
          </View>
          {open && (
            <View style={styles.details}>
              <Text style={styles.detailRow}>Balance: —</Text>
              <Text style={styles.detailRow}>Gain / Loss: —</Text>
              <Text style={styles.detailRow}>Holdings: —</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
      <Text style={styles.noPortfolios}>you have no portfolios</Text>
    </View>
  );
}

const FOLDER_RADIUS = 20;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingTop: 52,
  },
  noPortfolios: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#888',
    marginBottom: 8,
    textAlign: 'center',
    fontWeight: '400',
  },
  welcome: {
    fontSize: 20,
    fontWeight: '600',
    color: '#222',
    marginBottom: 20,
    marginTop: 40,
    textAlign: 'left',
  },
  moneySummary: {
    marginBottom: 32,
    alignItems: 'flex-start',
  },
  h1: { fontSize: 34, fontWeight: '700', color: '#000' },
  gain: { fontSize: 14, color: '#4CAF50', marginTop: 2 },
  cardShadowWrap: {
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 32,
    shadowOffset: { width: 0, height: 16 },
    elevation: 24,
    borderRadius: FOLDER_RADIUS,
    marginBottom: 32,
    backgroundColor: 'transparent',
  },
  folder: {
    backgroundColor: '#0C0C0C',
    borderRadius: FOLDER_RADIUS,
    padding: 28,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#00F0FF', // blue glow
    shadowOpacity: 0.15,
    shadowRadius: 40,
    shadowOffset: { width: 0, height: 0 },
    elevation: 12,
  },
  folderHeader: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  folderTitle: { color: '#FFFFFF', fontSize: 16, fontWeight: '500' },
  amount: { color: '#FFFFFF', fontSize: 24, fontWeight: '700' },
  details: { marginTop: 16, width: '100%' },
  detailRow: { color: '#BBBBBB', fontSize: 15, marginBottom: 6 },
}); 