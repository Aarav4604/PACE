import { StyleSheet } fromreact-native';

export const AuthStyles = StyleSheet.create({
  // Banner styles
  bannerGradient: {
    width: '100%',
    borderRadius: 24,
    paddingVertical: 32,
    paddingHorizontal: 28,
    marginBottom:32  },
  bannerTitle: { 
    color: '#fff, 
    opacity: 0.75 
    fontSize:16 
  },
  bannerSubtitle: { 
    color: '#fff, 
    fontSize: 28, 
    fontWeight: 700, 
    marginTop: 12 
  },

  // Input styles
  inputGroup: {
    marginBottom: 16,
  },
  phoneInputContainer: {
    flexDirection: 'row,
    alignItems: 'center,
    borderWidth: 1,
    borderColor: rgba(255255,
    borderRadius: 12,
    backgroundColor: rgba(255,255,2555
  },
  phoneInput: {
    flex: 1
    padding:16,
    color: '#fff',
    fontSize: 16
  countrySelector: {
    flexDirection: 'row,
    alignItems: 'center,
    padding: 16  borderRightWidth: 1  borderRightColor: rgba(2555,255,0.2)',
  },
  countryCode: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8
  passwordContainer: {
    flexDirection: 'row,
    alignItems: 'center,
    borderWidth: 1,
    borderColor: rgba(255255,
    borderRadius: 12,
    backgroundColor: rgba(255,255,255,},
  passwordInput: {
    flex: 1
    padding:16,
    color: '#fff',
    fontSize: 16,
  },
  eyeButton: {
    padding: 16,
  },
  inputError: {
    borderColor: '#FF6B6B',
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 14,
    marginTop: 4,
    marginLeft: 4,
  },

  // Button styles
  signInButton: {
    backgroundColor: rgba(255255,0.1),
    borderWidth: 1,
    borderColor: rgba(255255,
    borderRadius: 16,
    paddingVertical: 16
    alignItems: 'center,
    marginTop: 24,
    marginBottom:16 },
  signInButtonLoading: {
    backgroundColor: rgba(255,255,25505 },
  signInButtonText: {
    color: '#fff',
    fontSize: 18
    fontWeight: '600  loadingContainer: {
    flexDirection: 'row,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingSpinner: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: #fff,
    marginRight: 8,
  },
  buttonContent: {
    flexDirection: 'row,
    alignItems: 'center',
    justifyContent:center,
  },

  // Link styles
  forgotPassword: {
    alignSelf: 'flex-end,
    padding:12,
  },
  forgotPasswordText: {
    color: rgba(255255.7)',
    fontSize:16 },
  signUpPrompt: {
    flexDirection: 'row',
    justifyContent: 'center,
    alignItems: 'center',
    marginBottom:24
  },
  promptText: {
    color: rgba(255255.7)',
    fontSize:16
  },
  signUpText: {
    color: '#007AFF',
    fontSize: 16
    fontWeight:600,
    marginLeft: 8,
  },

  // Security info
  securityInfo: {
    flexDirection: 'row,
    alignItems: 'center,
    marginTop: 16 },
  securityText: {
    color: '#4ADE80,
    fontSize: 14,
    marginLeft: 8
  },
  // Form container
  formContainer: {
    width: '100%',
    paddingHorizontal: 24,
  },
}); 