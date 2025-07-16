import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { darkTheme as theme } from '../theme/theme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

export default function SignUpScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = () => {
    if (!email || !password || !confirm) {
      setError('Please fill all fields.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    // Placeholder: always succeed
    navigation.navigate('LinkBroker');
  };

  return (
    <KeyboardAvoidingView style={styles.root} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.card}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Sign up to get started</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={theme.colors.textSecondary}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={theme.colors.textSecondary}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor={theme.colors.textSecondary}
          value={confirm}
          onChangeText={setConfirm}
          secureTextEntry
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <TouchableOpacity style={styles.signupBtn} onPress={handleSignUp}>
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: 24,
    padding: 32,
    width: '90%',
    shadowColor: theme.colors.shadow,
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
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
  input: {
    width: '100%',
    backgroundColor: theme.colors.background,
    color: theme.colors.textPrimary,
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: theme.colors.muted,
  },
  error: {
    color: theme.colors.negative,
    marginBottom: 12,
    fontSize: 14,
  },
  signupBtn: {
    backgroundColor: theme.colors.accent,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 48,
    marginTop: 8,
    marginBottom: 8,
  },
  signupText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginBtn: {
    marginTop: 4,
  },
  loginText: {
    color: theme.colors.accent,
    fontSize: 16,
    fontWeight: '600',
  },
}); 