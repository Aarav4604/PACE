import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Text,
  Alert,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PortfolioSwipeStack from '../components/PortfolioSwipeStack';

const { width } = Dimensions.get('window');

interface Portfolio {
  id: string;
  name: string;
  description: string;
  performance: string;
  imageUrl?: string;
  tags: string[];
  followerCount: number;
}

// Mock data - replace with actual API call
const mockPortfolios: Portfolio[] = [
  {
    id: '1',
    name: 'Growth King',
    description: 'Focused on high-growth tech stocks with proven track record. Long-term investment strategy with quarterly rebalancing.',
    performance: '+24.5%',
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=600&fit=crop',
    tags: ['Tech', 'Growth', 'Long-term'],
    followerCount: 1250,
  },
  {
    id: '2',
    name: 'Dividend Warrior',
    description: 'Conservative dividend-focused portfolio targeting steady income. Perfect for risk-averse investors seeking stability.',
    performance: '+12.8%',
    imageUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=600&fit=crop',
    tags: ['Dividends', 'Conservative', 'Income'],
    followerCount: 890,
  },
  {
    id: '3',
    name: 'Crypto Moonshot',
    description: 'High-risk, high-reward cryptocurrency portfolio. Only for experienced investors comfortable with volatility.',
    performance: '+156.2%',
    imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=600&fit=crop',
    tags: ['Crypto', 'High-risk', 'Volatile'],
    followerCount: 2340,
  },
  {
    id: '4',
    name: 'ESG Champion',
    description: 'Sustainable investing with focus on environmental, social, and governance factors. Making impact while earning returns.',
    performance: '+18.9%',
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=600&fit=crop',
    tags: ['ESG', 'Sustainable', 'Impact'],
    followerCount: 756,
  },
  {
    id: '5',
    name: 'Value Hunter',
    description: 'Undervalued stocks with strong fundamentals. Patient approach to value investing with excellent long-term results.',
    performance: '+31.4%',
    imageUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&h=600&fit=crop',
    tags: ['Value', 'Fundamentals', 'Patient'],
    followerCount: 1120,
  },
];

const PortfoliosScreen = () => {
  const [portfolios, setPortfolios] = useState<Portfolio[]>(mockPortfolios);
  const [likedPortfolios, setLikedPortfolios] = useState<Portfolio[]>([]);
  const [passedPortfolios, setPassedPortfolios] = useState<Portfolio[]>([]);

  const handleSwipeLeft = (portfolio: Portfolio) => {
    setPassedPortfolios(prev => [...prev, portfolio]);
    console.log('Passed on:', portfolio.name);
  };

  const handleSwipeRight = (portfolio: Portfolio) => {
    setLikedPortfolios(prev => [...prev, portfolio]);
    console.log('Liked:', portfolio.name);
    
    // Show a brief confirmation
    Alert.alert(
      'Portfolio Liked! 👍',
      `You liked "${portfolio.name}". It's been added to your interests.`,
      [{ text: 'Great!', style: 'default' }]
    );
  };

  const handleStackEmpty = () => {
    Alert.alert(
      'All Done! 🎉',
      `You've reviewed all portfolios!\n\nLiked: ${likedPortfolios.length}\nPassed: ${passedPortfolios.length}`,
      [
        {
          text: 'View Liked',
          onPress: () => {
            console.log('Liked portfolios:', likedPortfolios);
          },
        },
        { text: 'OK', style: 'default' },
      ]
    );
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      {/* Background gradient and decorative elements */}
      <LinearGradient colors={["#000", "#1e293b", "#000"]} style={StyleSheet.absoluteFill} />
      <View style={styles.bgDecor1} />
      <View style={styles.bgDecor2} />
      <View style={styles.bgDecor3} />
      <View style={styles.bgDecor4} />
      
      {/* Ambient lighting effect */}
      <LinearGradient
        colors={["rgba(31,41,55,0.2)", "transparent"]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />

      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>
            <Text style={styles.titleThin}>Discover </Text>
            <Text style={styles.titleGradient}>Portfolios</Text>
            <Text style={styles.titleDot}>.</Text>
          </Text>
          <Text style={styles.subtitle}>
            Swipe right to <Text style={styles.subtitleBold}>like</Text> • Swipe left to <Text style={styles.subtitleBold}>pass</Text>
          </Text>
        </View>

        <PortfolioSwipeStack
          portfolios={portfolios}
          onSwipeLeft={handleSwipeLeft}
          onSwipeRight={handleSwipeRight}
          onEmpty={handleStackEmpty}
        />
      </SafeAreaView>
      
      {/* Bottom glow indicator */}
      <LinearGradient
        colors={["transparent", "#fff", "transparent"]}
        style={styles.bottomGlow}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#000',
  },
  container: {
    flex: 1,
    zIndex: 2,
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    alignItems: 'center',
    zIndex: 3,
  },
  title: {
    fontSize: 32,
    fontWeight: '300',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  titleThin: {
    fontWeight: '200',
    color: '#fff',
  },
  titleGradient: {
    fontWeight: '400',
    color: '#e5e7eb',
    textShadowColor: '#fff',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  titleDot: {
    color: '#d1d5db',
    fontWeight: '400',
  },
  subtitle: {
    fontSize: 16,
    color: '#d1d5db',
    textAlign: 'center',
    fontWeight: '300',
    letterSpacing: 0.3,
  },
  subtitleBold: {
    color: '#fff',
    fontWeight: '400',
  },
  // Decorative background shapes
  bgDecor1: {
    position: 'absolute',
    top: 100,
    left: 30,
    width: 80,
    height: 80,
    backgroundColor: '#6b7280',
    borderRadius: 20,
    opacity: 0.3,
    transform: [{ rotate: '15deg' }],
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    zIndex: 0,
  },
  bgDecor2: {
    position: 'absolute',
    top: 200,
    right: 40,
    width: 60,
    height: 100,
    backgroundColor: '#374151',
    borderRadius: 16,
    opacity: 0.25,
    transform: [{ rotate: '-20deg' }],
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    zIndex: 0,
  },
  bgDecor3: {
    position: 'absolute',
    bottom: 200,
    left: 20,
    width: 40,
    height: 70,
    backgroundColor: '#9ca3af',
    borderRadius: 12,
    opacity: 0.2,
    transform: [{ rotate: '40deg' }],
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    zIndex: 0,
  },
  bgDecor4: {
    position: 'absolute',
    bottom: 150,
    right: 50,
    width: 70,
    height: 35,
    backgroundColor: '#374151',
    borderRadius: 14,
    opacity: 0.18,
    transform: [{ rotate: '-10deg' }],
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    zIndex: 0,
  },
  // Bottom glow indicator
  bottomGlow: {
    position: 'absolute',
    bottom: 32,
    left: width / 2 - 64,
    width: 128,
    height: 6,
    borderRadius: 3,
    opacity: 0.6,
    zIndex: 2,
    shadowColor: '#fff',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
});

export default PortfoliosScreen; 