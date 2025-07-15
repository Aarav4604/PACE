import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../theme/theme';
import Haptic from 'react-native-haptic-feedback';

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  style?: ViewStyle;
}

const PrimaryButton = ({ label, onPress, style }: PrimaryButtonProps) => {
  const handlePress = () => {
    Haptic.trigger('impactLight');
    onPress();
  };
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={handlePress} activeOpacity={0.85}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.accent,
    borderRadius: theme.radius.card,
    paddingVertical: theme.spacing(3),
    paddingHorizontal: theme.spacing(6),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing(4),
  },
  label: {
    color: theme.colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PrimaryButton; 