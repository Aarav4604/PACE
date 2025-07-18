import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import PortfolioSwipeCard from './PortfolioSwipeCard';

const { width: screenWidth } = Dimensions.get('window');

interface Portfolio {
  id: string;
  name: string;
  description: string;
  performance: string;
  imageUrl?: string;
  tags: string[];
  followerCount: number;
}

interface PortfolioSwipeStackProps {
  portfolios: Portfolio[];
  onSwipeLeft: (portfolio: Portfolio) => void;
  onSwipeRight: (portfolio: Portfolio) => void;
  onEmpty?: () => void;
}

const MAX_VISIBLE_CARDS = 3;

const PortfolioSwipeStack: React.FC<PortfolioSwipeStackProps> = ({
  portfolios,
  onSwipeLeft,
  onSwipeRight,
  onEmpty,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const animationProgress = useSharedValue(0);

  const handleSwipeLeft = (portfolio: Portfolio) => {
    onSwipeLeft(portfolio);
    moveToNext();
  };

  const handleSwipeRight = (portfolio: Portfolio) => {
    onSwipeRight(portfolio);
    moveToNext();
  };

  const moveToNext = () => {
    animationProgress.value = withTiming(1, { duration: 300 }, () => {
      animationProgress.value = 0;
    });
    
    setTimeout(() => {
      setCurrentIndex(prev => {
        const nextIndex = prev + 1;
        if (nextIndex >= portfolios.length && onEmpty) {
          onEmpty();
        }
        return nextIndex;
      });
    }, 150);
  };

  const programmaticSwipe = (direction: 'left' | 'right') => {
    if (currentIndex >= portfolios.length) return;
    
    const currentPortfolio = portfolios[currentIndex];
    if (direction === 'left') {
      handleSwipeLeft(currentPortfolio);
    } else {
      handleSwipeRight(currentPortfolio);
    }
  };

  const visiblePortfolios = portfolios.slice(currentIndex, currentIndex + MAX_VISIBLE_CARDS);

  if (currentIndex >= portfolios.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>No More Portfolios!</Text>
        <Text style={styles.emptySubtitle}>
          You've seen all available portfolios. Check back later for more!
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.stackContainer}>
        {visiblePortfolios.map((portfolio, index) => {
          const cardIndex = currentIndex + index;
          const isTopCard = index === 0;
          
          return (
            <CardWithAnimation
              key={portfolio.id}
              portfolio={portfolio}
              index={index}
              isTopCard={isTopCard}
              onSwipeLeft={handleSwipeLeft}
              onSwipeRight={handleSwipeRight}
              animationProgress={animationProgress}
            />
          );
        })}
      </View>
      
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.actionButton, styles.passButton]}
          onPress={() => programmaticSwipe('left')}
        >
          <Text style={styles.buttonText}>✕</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.actionButton, styles.likeButton]}
          onPress={() => programmaticSwipe('right')}
        >
          <Text style={styles.buttonText}>♥</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          {currentIndex + 1} of {portfolios.length}
        </Text>
      </View>
    </View>
  );
};

interface CardWithAnimationProps {
  portfolio: Portfolio;
  index: number;
  isTopCard: boolean;
  onSwipeLeft: (portfolio: Portfolio) => void;
  onSwipeRight: (portfolio: Portfolio) => void;
  animationProgress: Animated.SharedValue<number>;
}

const CardWithAnimation: React.FC<CardWithAnimationProps> = ({
  portfolio,
  index,
  isTopCard,
  onSwipeLeft,
  onSwipeRight,
  animationProgress,
}) => {
  const cardStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      index,
      [0, 1, 2],
      [1, 0.95, 0.9]
    );
    
    const translateY = interpolate(
      index,
      [0, 1, 2],
      [0, 10, 20]
    );
    
    const opacity = interpolate(
      index,
      [0, 1, 2],
      [1, 0.8, 0.6]
    );

    // Animation for moving cards up when top card is swiped
    const animatedScale = interpolate(
      animationProgress.value,
      [0, 1],
      [scale, index === 1 ? 1 : scale]
    );
    
    const animatedTranslateY = interpolate(
      animationProgress.value,
      [0, 1],
      [translateY, index === 1 ? 0 : translateY]
    );
    
    const animatedOpacity = interpolate(
      animationProgress.value,
      [0, 1],
      [opacity, index === 1 ? 1 : opacity]
    );

    return {
      transform: [
        { scale: animatedScale },
        { translateY: animatedTranslateY },
      ],
      opacity: animatedOpacity,
      zIndex: 10 - index,
    };
  });

  return (
    <Animated.View style={[styles.cardWrapper, cardStyle]}>
      <PortfolioSwipeCard
        portfolio={portfolio}
        onSwipeLeft={isTopCard ? onSwipeLeft : () => {}}
        onSwipeRight={isTopCard ? onSwipeRight : () => {}}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  stackContainer: {
    width: screenWidth,
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardWrapper: {
    position: 'absolute',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
    marginTop: 32,
  },
  actionButton: {
    width: 64,
    height: 64,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(17,24,39,0.85)',
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
  passButton: {
    backgroundColor: 'rgba(107, 114, 128, 0.6)',
  },
  likeButton: {
    backgroundColor: 'rgba(17,24,39,0.85)',
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '300',
    letterSpacing: 0.5,
  },
  progressContainer: {
    marginTop: 24,
  },
  progressText: {
    fontSize: 16,
    color: '#9ca3af',
    fontWeight: '300',
    letterSpacing: 0.5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#000',
  },
  emptyTitle: {
    fontSize: 32,
    fontWeight: '300',
    color: '#fff',
    marginBottom: 16,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  emptySubtitle: {
    fontSize: 18,
    color: '#d1d5db',
    textAlign: 'center',
    lineHeight: 26,
    fontWeight: '300',
  },
});

export default PortfolioSwipeStack;