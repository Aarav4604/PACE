import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { TextInput } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import { darkTheme as theme } from '../theme/theme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { AuthContext } from '../contexts/AuthContext';

export default function LoginScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { login } = React.useContext(AuthContext);
  const { control, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    login(data.email, data.password);
    navigation.replace('Tabs');
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.root} keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to your account</Text>
          <Controller
            control={control}
            name="email"
            rules={{ required: 'Email is required' }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Email"
                value={value}
                onChangeText={onChange}
                style={styles.input}
                mode="outlined"
                theme={{ colors: { text: theme.colors.textPrimary, placeholder: theme.colors.textSecondary, background: theme.colors.background, primary: theme.colors.accent } }}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            )}
          />
          {typeof errors.email?.message === 'string' ? <Text style={styles.error}>{errors.email.message}</Text> : null}
          <Controller
            control={control}
            name="password"
            rules={{ required: 'Password is required' }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Password"
                value={value}
                onChangeText={onChange}
                style={styles.input}
                mode="outlined"
                theme={{ colors: { text: theme.colors.textPrimary, placeholder: theme.colors.textSecondary, background: theme.colors.background, primary: theme.colors.accent } }}
                secureTextEntry
              />
            )}
          />
          {typeof errors.password?.message === 'string' ? <Text style={styles.error}>{errors.password.message}</Text> : null}
          <TouchableOpacity onPress={handleSubmit(onSubmit)} activeOpacity={0.85} style={{ width: '100%' }}>
            <LinearGradient colors={["#3B82F6", "#2563EB"]} style={styles.loginBtn}>
              <Text style={styles.loginText}>Login</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signupBtn} onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signupText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
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
    marginBottom: 16,
    backgroundColor: theme.colors.background,
  },
  error: {
    color: theme.colors.negative,
    marginBottom: 12,
    fontSize: 14,
    alignSelf: 'flex-start',
  },
  loginBtn: {
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
    elevation: 8,
  },
  loginText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupBtn: {
    marginTop: 4,
  },
  signupText: {
    color: theme.colors.accent,
    fontSize: 16,
    fontWeight: '600',
  },
}); 