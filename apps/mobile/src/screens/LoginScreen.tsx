import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Vibration,
} from 'react-native';
import { default as Icon } from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [countryCode, setCountryCode] = useState('+1');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Loading spinner animation
  useEffect(() => {
    if (isLoading) {
      const spinAnimation = Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        })
      );
      spinAnimation.start();
      return () => spinAnimation.stop();
    }
  }, [isLoading]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const validateForm = () => {
    const newErrors: any = {};
    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (phoneNumber.replace(/\D/g, '').length < 10) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = async () => {
    if (!validateForm()) {
      Vibration.vibrate(100);
      return;
    }
    setIsLoading(true);
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    setTimeout(() => {
      setIsLoading(false);
      Vibration.vibrate([100, 50, 100]);
      Alert.alert('Success', 'Signed in successfully!');
      // navigation.navigate('Dashboard');
    }, 2000);
  };

  const formatPhoneNumber = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `${match[1]} ${match[2]} ${match[3]}`;
    }
    return text;
  };

  const handlePhoneChange = (text: string) => {
    const formatted = formatPhoneNumber(text);
    setPhoneNumber(formatted);
    if (errors.phoneNumber) {
      setErrors({ ...errors, phoneNumber: null });
    }
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (errors.password) {
      setErrors({ ...errors, password: null });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Animated background circles */}
          <Animated.View style={[styles.backgroundCircles, { opacity: fadeAnim }]}> 
            <Animated.View style={[styles.circle, styles.circle1, { transform: [{ scale: scaleAnim }] }]} />
            <Animated.View style={[styles.circle, styles.circle2, { transform: [{ scale: scaleAnim }] }]} />
            <Animated.View style={[styles.circle, styles.circle3, { transform: [{ scale: scaleAnim }] }]} />
            <Animated.View style={[styles.circle, styles.circle4, { transform: [{ scale: scaleAnim }] }]} />
            <Animated.View style={[styles.circle, styles.circle5, { transform: [{ scale: scaleAnim }] }]} />
            <Animated.View style={[styles.circle, styles.circle6, { transform: [{ scale: scaleAnim }] }]} />
          </Animated.View>
          {/* Main content */}
          <Animated.View style={[styles.mainContent, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}> 
            {/* Trading avatars */}
            <View style={styles.avatarsContainer}>
              <View style={styles.avatarsRow}>
                {/* Trading chart avatar */}
                <Animated.View style={[styles.avatar, styles.chartAvatar, { transform: [{ scale: scaleAnim }] }]}> 
                  <View style={styles.chartBars}>
                    <View style={[styles.chartBar, { height: 16 }]} />
                    <View style={[styles.chartBar, { height: 24 }]} />
                    <View style={[styles.chartBar, { height: 20 }]} />
                    <View style={[styles.chartBar, { height: 28 }]} />
                  </View>
                </Animated.View>
                {/* Crypto avatar */}
                <Animated.View style={[styles.avatar, styles.cryptoAvatar, styles.centerAvatar, { transform: [{ scale: scaleAnim }] }]}> 
                  <View style={styles.cryptoIcon}>
                    <View style={styles.cryptoCircle} />
                    <View style={styles.cryptoX1} />
                    <View style={styles.cryptoX2} />
                  </View>
                </Animated.View>
                {/* Forex avatar */}
                <Animated.View style={[styles.avatar, styles.forexAvatar, { transform: [{ scale: scaleAnim }] }]}> 
                  <View style={styles.forexWaves}>
                    <View style={styles.forexWave1} />
                    <View style={styles.forexWave2} />
                  </View>
                </Animated.View>
              </View>
              {/* Trading label */}
              <Animated.View style={[styles.tradingLabel, { transform: [{ scale: scaleAnim }] }]}> 
                <Text style={styles.tradingLabelText}>Trading</Text>
              </Animated.View>
            </View>
            {/* Main heading */}
            <Animated.Text style={[styles.mainHeading, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}> 
              Welcome back!{"\n"}Let's sign you in
            </Animated.Text>
          </Animated.View>
        </ScrollView>
        {/* Sign in form */}
        <Animated.View style={[styles.formContainer, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}> 
          <View style={styles.signUpPrompt}>
            <Text style={styles.promptText}>Don't have an account yet?</Text>
            <TouchableOpacity onPress={() => Alert.alert('Info', 'Navigate to Sign Up')}>
              <Text style={styles.signUpText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
          {/* Phone number input */}
          <View style={styles.inputGroup}>
            <View style={[styles.phoneInputContainer, errors.phoneNumber && styles.inputError]}>
              <TouchableOpacity style={styles.countrySelector}>
                <Text style={styles.flag}>🇺🇸</Text>
                <Text style={styles.countryCode}>{countryCode}</Text>
                {React.createElement(Icon as any, { name: "chevron-down", size: 16, color: "#666" })}
              </TouchableOpacity>
              <TextInput
                style={styles.phoneInput}
                placeholder="123 456 7890"
                placeholderTextColor="#999"
                value={phoneNumber}
                onChangeText={handlePhoneChange}
                keyboardType="phone-pad"
                maxLength={12}
              />
            </View>
            {errors.phoneNumber && (
              <Animated.Text style={styles.errorText}>
                {errors.phoneNumber}
              </Animated.Text>
            )}
          </View>
          {/* Password input */}
          <View style={styles.inputGroup}>
            <View style={[styles.passwordContainer, errors.password && styles.inputError]}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Password"
                placeholderTextColor="#999"
                value={password}
                onChangeText={handlePasswordChange}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}
              >
                {React.createElement(Icon as any, { 
                  name: showPassword ? "eye-off" : "eye", 
                  size: 20, 
                  color: "#666" 
                })}
              </TouchableOpacity>
            </View>
            {errors.password && (
              <Animated.Text style={styles.errorText}>
                {errors.password}
              </Animated.Text>
            )}
          </View>
          {/* Forgot password */}
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
          </TouchableOpacity>
          {/* Sign in button */}
          <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
            <TouchableOpacity 
              style={[styles.signInButton, isLoading && styles.signInButtonLoading]}
              onPress={handleSignIn}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              {isLoading ? (
                <View style={styles.loadingContainer}>
                  <Animated.View style={[
                    styles.loadingSpinner,
                    { transform: [{ rotate: spin }] }
                  ]} />
                  <Text style={styles.signInButtonText}>Signing In...</Text>
                </View>
              ) : (
                <View style={styles.buttonContent}>
                  <Text style={styles.signInButtonText}>Sign In</Text>
                  {React.createElement(Icon as any, { name: "arrow-forward", size: 20, color: "white" })}
                </View>
              )}
            </TouchableOpacity>
          </Animated.View>
          {/* Security info */}
          <View style={styles.securityInfo}>
            {React.createElement(Icon as any, { name: "shield-checkmark", size: 16, color: "#4ADE80" })}
            <Text style={styles.securityText}>Your data is encrypted and secure</Text>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundCircles: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  circle: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: '50%',
  },
  circle1: {
    backgroundColor: '#3B82F6',
    top: 0,
    left: 0,
  },
  circle2: {
    backgroundColor: '#2563EB',
    top: 0,
    right: 0,
  },
  circle3: {
    backgroundColor: '#3B82F6',
    bottom: 0,
    left: 0,
  },
  circle4: {
    backgroundColor: '#2563EB',
    bottom: 0,
    right: 0,
  },
  circle5: {
    backgroundColor: '#3B82F6',
    top: 0,
    left: 0,
  },
  circle6: {
    backgroundColor: '#2563EB',
    top: 0,
    right: 0,
  },
  mainContent: {
    position: 'relative',
    zIndex: 1,
  },
  avatarsContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  avatarsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
    position: 'relative',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  avatarGlow: {
    position: 'absolute',
    width: 90,
    height: 90,
    borderRadius: 45,
    opacity: 0.3,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 15,
  },
  chartAvatar: {
    backgroundColor: '#F8BBD9',
    shadowColor: '#F8BBD9',
  },
  chartBars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2,
  },
  chartBar: {
    width: 6,
    backgroundColor: '#374151',
    borderRadius: 1,
    marginHorizontal: 1,
  },
  cryptoAvatar: {
    backgroundColor: '#BFDBFE',
    shadowColor: '#BFDBFE',
  },
  cryptoGlow: {
    shadowColor: '#60A5FA',
  },
  centerAvatar: {
    marginTop: -16,
    zIndex: 1,
  },
  cryptoIcon: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cryptoCircle: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#374151',
  },
  cryptoX1: {
    position: 'absolute',
    width: 16,
    height: 2,
    backgroundColor: '#374151',
    transform: [{ rotate: '45deg' }],
    top: 15,
    left: 8,
  },
  cryptoX2: {
    position: 'absolute',
    width: 16,
    height: 2,
    backgroundColor: '#374151',
    transform: [{ rotate: '-45deg' }],
    top: 15,
    left: 8,
  },
  forexAvatar: {
    backgroundColor: '#BBF7D0',
    shadowColor: '#BBF7D0',
  },
  forexWaves: {
    width: 32,
    height: 16,
  },
  forexWave1: {
    width: 32,
    height: 6,
    backgroundColor: '#374151',
    borderRadius: 3,
    marginBottom: 4,
  },
  forexWave2: {
    width: 32,
    height: 6,
    backgroundColor: '#374151',
    borderRadius: 3,
  },
  tradingLabel: {
    marginTop: 16,
    alignItems: 'center',
  },
  tradingLabelText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  labelGlow: {
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginTop: 4,
  },
  mainHeading: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  formContainer: {
    padding: 32,
    width: '100%',
  },
  signUpPrompt: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  promptText: {
    color: '#fff',
    fontSize: 16,
  },
  signUpText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  inputGroup: {
    marginBottom: 16,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#666',
    borderRadius: 8,
  },
  phoneInput: {
    flex: 1,
    padding: 12,
    color: '#fff',
  },
  countrySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  flag: {
    color: '#fff',
    fontSize: 16,
    marginRight: 8,
  },
  countryCode: {
    color: '#fff',
    fontSize: 16,
  },
  inputError: {
    borderColor: '#FF0000',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#666',
    borderRadius: 8,
  },
  passwordInput: {
    flex: 1,
    padding: 12,
    color: '#fff',
  },
  eyeButton: {
    padding: 12,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    padding: 12,
  },
  forgotPasswordText: {
    color: '#fff',
    fontSize: 16,
  },
  signInButton: {
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
    elevation: 8,
  },
  signInButtonLoading: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  signInButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingSpinner: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#fff',
    marginRight: 8,
  },
  securityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  securityText: {
    color: '#fff',
    fontSize: 16,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 14,
    marginTop: 4,
    marginLeft: 4,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 