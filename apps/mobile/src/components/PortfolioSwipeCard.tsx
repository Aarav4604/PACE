import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  runOnJS,
  interpolate,
  withSpring,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const CARD_WIDTH = screenWidth * 0.9;
const CARD_HEIGHT = screenHeight * 0.7;
const SWIPE_THRESHOLD = screenWidth * 0.3;

interface Portfolio {
  id: string;
  name: string;
  description: string;
  performance: string;
  imageUrl?: string;
  tags: string[];
  followerCount: number;
}

interface PortfolioSwipeCardProps {
  portfolio: Portfolio;
  onSwipeLeft: (portfolio: Portfolio) => void;
  onSwipeRight: (portfolio: Portfolio) => void;
  style?: any;
}

const PortfolioSwipeCard: React.FC<PortfolioSwipeCardProps> = ({
  portfolio,
  onSwipeLeft,
  onSwipeRight,
  style,
}) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onStart: () => {
      scale.value = withSpring(0.95);
    },
    onActive: (event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    },
    onEnd: (event) => {
      const shouldSwipeLeft = translateX.value < -SWIPE_THRESHOLD;
      const shouldSwipeRight = translateX.value > SWIPE_THRESHOLD;

      if (shouldSwipeLeft) {
        translateX.value = withSpring(-screenWidth * 1.5);
        translateY.value = withSpring(translateY.value + 200);
        runOnJS(onSwipeLeft)(portfolio);
      } else if (shouldSwipeRight) {
        translateX.value = withSpring(screenWidth * 1.5);
        translateY.value = withSpring(translateY.value + 200);
        runOnJS(onSwipeRight)(portfolio);
      } else {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
      
      scale.value = withSpring(1);
    },
  });

  const cardStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      translateX.value,
      [-screenWidth / 2, 0, screenWidth / 2],
      [-15, 0, 15]
    );

    const opacity = interpolate(
      Math.abs(translateX.value),
      [0, SWIPE_THRESHOLD],
      [1, 0.7]
    );

    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotate}deg` },
        { scale: scale.value },
      ],
      opacity,
    };
  });

  const leftOverlayStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [-SWIPE_THRESHOLD, 0],
      [1, 0]
    );
    return { opacity };
  });

  const rightOverlayStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [0, SWIPE_THRESHOLD],
      [0, 1]
    );
    return { opacity };
  });

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[styles.card, cardStyle, style]}>
        <ImageBackground
          source={{ uri: portfolio.imageUrl || 'https://via.placeholder.com/400x600' }}
          style={styles.cardImage}
          imageStyle={styles.imageStyle}
        >
          <View style={styles.overlay}>
            <View style={styles.cardContent}>
              <View style={styles.header}>
                <Text style={styles.name}>{portfolio.name}</Text>
                <Text style={styles.performance}>{portfolio.performance}</Text>
              </View>
              
              <Text style={styles.description} numberOfLines={3}>
                {portfolio.description}
              </Text>
              
              <View style={styles.tagsContainer}>
                {portfolio.tags.slice(0, 3).map((tag, index) => (
                  <View key={index} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>
              
              <View style={styles.footer}>
                <Text style={styles.followers}>
                  {portfolio.followerCount.toLocaleString()} followers
                </Text>
              </View>
            </View>
          </View>

          {/* Swipe Overlays */}
          <Animated.View style={[styles.swipeOverlay, styles.leftOverlay, leftOverlayStyle]}>
            <Text style={styles.overlayText}>PASS</Text>
          </Animated.View>
          
          <Animated.View style={[styles.swipeOverlay, styles.rightOverlay, rightOverlayStyle]}>
            <Text style={styles.overlayText}>LIKE</Text>
          </Animated.View>
        </ImageBackground>
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 24,
    backgroundColor: '#111827',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
  },
  cardImage: {
    flex: 1,
    borderRadius: 24,
    overflow: 'hidden',
  },
  imageStyle: {
    borderRadius: 24,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 24,
  },
  cardContent: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  header: {
    marginTop: 'auto',
    marginBottom: 12,
  },
  name: {
    fontSize: 28,
    fontWeight: '300',
    color: '#fff',
    marginBottom: 6,
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  performance: {
    fontSize: 18,
    color: '#e5e7eb',
    fontWeight: '400',
    textShadowColor: '#fff',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  description: {
    fontSize: 16,
    color: '#d1d5db',
    lineHeight: 24,
    marginBottom: 16,
    fontWeight: '300',
    opacity: 0.9,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  tag: {
    backgroundColor: 'rgba(107, 114, 128, 0.4)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 6,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  tagText: {
    color: '#e5e7eb',
    fontSize: 12,
    fontWeight: '400',
    letterSpacing: 0.2,
  },
  footer: {
    alignItems: 'flex-start',
  },
  followers: {
    fontSize: 14,
    color: '#9ca3af',
    fontWeight: '300',
  },
  swipeOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
  },
  leftOverlay: {
    backgroundColor: 'rgba(55, 65, 81, 0.95)',
  },
  rightOverlay: {
    backgroundColor: 'rgba(17, 24, 39, 0.95)',
  },
  overlayText: {
    fontSize: 48,
    fontWeight: '300',
    color: '#fff',
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 8,
  },
});

export default PortfolioSwipeCard;