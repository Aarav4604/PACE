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
import { default as Icon } from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';
import { AuthContext } from '../contexts/AuthContext';
import AuthLayout from '../components/AuthLayout';

const { width, height } = Dimensions.get('window');

export default function SignUpScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { register } = React.useContext(AuthContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [dialCode, setDialCode] = useState('+1');
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
    if (!firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
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
    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
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
    
    try {
      await register({
        name: `${firstName} ${lastName}`,
        email,
        phone: dialCode + phoneNumber,
        password,
      });
      Vibration.vibrate([100, 50, 100]);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Sign up failed');
    } finally {
      setIsLoading(false);
    }
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

  return (
    <AuthLayout>
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
          {/* Banner */}
          <LinearGradient
            colors={['#1a3cf3', '#0667']}
            style={styles.bannerGradient}
          >
            <Text style={styles.bannerTitle}>Trading</Text>
            <Text style={styles.bannerSubtitle}>Join PACE{"\n"}Create your account</Text>
          </LinearGradient>
          
          {/* Main content */}
          <Animated.View style={[styles.mainContent, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}> 
            {/* Trading avatars */}
            <View style={styles.tradingIconsContainer}>
              <View style={styles.avatarsRow}>
                <Animated.View style={[styles.avatar, styles.chartAvatar, { transform: [{ scale: scaleAnim }] }]}> 
                  <View style={styles.chartBars}>
                    <View style={[styles.chartBar, { height: 16 }]} />
                    <View style={[styles.chartBar, { height: 24 }]} />
                    <View style={[styles.chartBar, { height: 20 }]} />
                    <View style={[styles.chartBar, { height: 28 }]} />
                  </View>
                </Animated.View>
                <Animated.View style={[styles.avatar, styles.cryptoAvatar, styles.centerAvatar, { transform: [{ scale: scaleAnim }] }]}> 
                  <View style={styles.cryptoIcon}>
                    <View style={styles.cryptoCircle} />
                    <View style={styles.cryptoX1} />
                    <View style={styles.cryptoX2} />
                  </View>
                </Animated.View>
                <Animated.View style={[styles.avatar, styles.forexAvatar, { transform: [{ scale: scaleAnim }] }]}> 
                  <View style={styles.forexWaves}>
                    <View style={styles.forexWave1} />
                    <View style={styles.forexWave2} />
                  </View>
                </Animated.View>
              </View>
              <Text style={styles.tradingLabel}>Trading</Text>
            </View>
          </Animated.View>
          <Animated.Text style={[styles.mainHeading, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}> 
            Join PACE{"\n"}Create your account
          </Animated.Text>
        </ScrollView>
        
        {/* Sign up form */}
        <Animated.View style={[styles.formContainer, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}> 
          <View style={styles.signInPrompt}>
            <Text style={styles.promptText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.signInText}>Sign In</Text>
            </TouchableOpacity>
          </View>
          
          {/* Name inputs */}
          <View style={styles.nameRow}>
            <View style={styles.inputGroup}>
              <TextInput
                style={[styles.nameInput, errors.firstName && styles.inputError]}
                placeholder="First Name"
                placeholderTextColor="rgba(255, 255, 255, 0.7)"
                value={firstName}
                onChangeText={(text) => {
                  setFirstName(text);
                  if (errors.firstName) setErrors({ ...errors, firstName: null });
                }}
              />
              {errors.firstName && (
                <Text style={styles.errorText}>{errors.firstName}</Text>
              )}
            </View>
            <View style={styles.inputGroup}>
              <TextInput
                style={[styles.nameInput, errors.lastName && styles.inputError]}
                placeholder="Last Name"
                placeholderTextColor="rgba(255, 255, 255, 0.7)"
                value={lastName}
                onChangeText={(text) => {
                  setLastName(text);
                  if (errors.lastName) setErrors({ ...errors, lastName: null });
                }}
              />
              {errors.lastName && (
                <Text style={styles.errorText}>{errors.lastName}</Text>
              )}
            </View>
          </View>
          
          {/* Email input */}
          <View style={styles.inputGroup}>
            <TextInput
              style={[styles.emailInput, errors.email && styles.inputError]}
              placeholder="Email"
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (errors.email) setErrors({ ...errors, email: null });
              }}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
          </View>
          
          {/* Phone number input */}
          <View style={styles.inputGroup}>
            <View style={[styles.phoneInputContainer, errors.phoneNumber && styles.inputError]}>
              <View style={styles.countrySelector}>
                <Text style={styles.countryCode}>{dialCode}</Text>
                {React.createElement(Icon as any, { name: "chevron-down", size: 16, color: "#fff" })}
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                {React.createElement(Icon as any, { name: "smartphone", size: 20, color: "#fff", marginRight: 12 })}
                <TextInput
                  style={styles.phoneInput}
                  placeholder="123 456 7890"
                  placeholderTextColor="rgba(255, 255, 255, 0.7)"
                  value={phoneNumber}
                  onChangeText={handlePhoneChange}
                  keyboardType="phone-pad"
                  maxLength={12}
                />
              </View>
            </View>
            {errors.phoneNumber && (
              <Text style={styles.errorText}>{errors.phoneNumber}</Text>
            )}
          </View>
          
          {/* Password inputs */}
          <View style={styles.inputGroup}>
            <View style={[styles.passwordContainer, errors.password && styles.inputError]}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Password"
                placeholderTextColor="rgba(255, 255, 255, 0.7)"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (errors.password) setErrors({ ...errors, password: null });
                }}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}
              >
                {React.createElement(Icon as any, { 
                  name: showPassword ? "eye-off" : "eye", 
                  size: 20, 
                  color: "#fff" 
                })}
              </TouchableOpacity>
            </View>
            {errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
          </View>
          
          <View style={styles.inputGroup}>
            <View style={[styles.passwordContainer, errors.confirmPassword && styles.inputError]}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Confirm Password"
                placeholderTextColor="rgba(255, 255, 255, 0.7)"
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                  if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: null });
                }}
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {React.createElement(Icon as any, { 
                  name: showConfirmPassword ? "eye-off" : "eye", 
                  size: 20, 
                  color: "#fff" 
                })}
              </TouchableOpacity>
            </View>
            {errors.confirmPassword && (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            )}
          </View>
          
          {/* Sign up button */}
          <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
            <TouchableOpacity 
              style={[styles.signUpButton, isLoading && styles.signUpButtonLoading]}
              onPress={handleSignUp}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              {isLoading ? (
                <View style={styles.loadingContainer}>
                  <Animated.View style={[
                    styles.loadingSpinner,
                    { transform: [{ rotate: spin }] }
                  ]} />
                  <Text style={styles.signUpButtonText}>Creating Account...</Text>
                </View>
              ) : (
                <View style={styles.buttonContent}>
                  <Text style={styles.signUpButtonText}>Create Account</Text>
                  {React.createElement(Icon as any, { name: "arrow-right", size: 20, color: "white" })}
                </View>
              )}
            </TouchableOpacity>
          </Animated.View>
          
          {/* Security info */}
          <View style={styles.securityInfo}>
            {React.createElement(Icon as any, { name: "shield", size: 16, color: "#4ADE80" })}
            <Text style={styles.securityText}>Your data is encrypted and secure</Text>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </AuthLayout>
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
  bannerGradient: {
    width: '100%',
    borderRadius: 24,
    paddingVertical: 32,
    paddingHorizontal: 28,
    marginBottom: 32,
  },
  bannerTitle: {
    color: '#fff',
    opacity: 0.75,
    fontSize: 16,
  },
  bannerSubtitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    marginTop: 12,
  },
  mainContent: {
    position: 'relative',
    zIndex: 1,
  },
  tradingIconsContainer: {
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
  formContainer: {
    padding: 32,
    width: '100%',
  },
  signInPrompt: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  promptText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 16,
  },
  signInText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  nameRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  inputGroup: {
    flex: 1,
  },
  nameInput: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    color: '#fff',
    fontSize: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  emailInput: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    color: '#fff',
    fontSize: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 16,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 16,
  },
  phoneInput: {
    flex: 1,
    padding: 16,
    color: '#fff',
    fontSize: 16,
  },
  countrySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRightWidth: 1,
    borderRightColor: 'rgba(255, 255, 255, 0.1)',
  },
  countryCode: {
    color: '#fff',
    fontSize: 16,
    marginRight: 8,
  },
  inputError: {
    borderColor: '#FF6B6B',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 16,
  },
  passwordInput: {
    flex: 1,
    padding: 16,
    color: '#fff',
    fontSize: 16,
  },
  eyeButton: {
    padding: 16,
  },
  signUpButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  signUpButtonLoading: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
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
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  securityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  securityText: {
    color: '#4ADE80',
    fontSize: 14,
    marginLeft: 8,
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 14,
    marginTop: 4,
    marginLeft: 4,
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
  mainHeading: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
}); 