import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { colors, spacing, typography, borderRadius } from '../../theme';
import { Button, Input } from '../../components/common';
import { useAuth, useForm } from '../../hooks';

const validateRegister = (values) => {
  const errors = {};
  if (!values.name?.trim()) errors.name = 'Business name is required';
  if (!values.email?.trim()) errors.email = 'Email is required';
  else if (!/\S+@\S+\.\S+/.test(values.email))
    errors.email = 'Enter a valid email';
  if (!values.phone?.trim()) errors.phone = 'Phone number is required';
  if (!values.password?.trim()) errors.password = 'Password is required';
  else if (values.password.length < 6)
    errors.password = 'Password must be at least 6 characters';
  if (values.password !== values.confirmPassword)
    errors.confirmPassword = 'Passwords do not match';
  return errors;
};

const RegisterScreen = ({ navigation }) => {
  const { register, isLoading, error } = useAuth();
  const { values, errors, handleChange, handleSubmit } = useForm(
    { name: '', email: '', phone: '', password: '', confirmPassword: '' },
    validateRegister
  );

  const onRegister = async (formValues) => {
    const { confirmPassword, ...data } = formValues;
    await register(data);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>
            Set up your tailoring business profile
          </Text>
        </View>

        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <View style={styles.form}>
          <Input
            label="Business Name"
            value={values.name}
            onChangeText={(val) => handleChange('name', val)}
            placeholder="Your Tailoring Business"
            error={errors.name}
            required
          />
          <Input
            label="Email"
            value={values.email}
            onChangeText={(val) => handleChange('email', val)}
            placeholder="your@email.com"
            keyboardType="email-address"
            error={errors.email}
            required
          />
          <Input
            label="Phone Number"
            value={values.phone}
            onChangeText={(val) => handleChange('phone', val)}
            placeholder="+1 (555) 000-0000"
            keyboardType="phone-pad"
            error={errors.phone}
            required
          />
          <Input
            label="Password"
            value={values.password}
            onChangeText={(val) => handleChange('password', val)}
            placeholder="Create a password"
            secureTextEntry
            error={errors.password}
            required
          />
          <Input
            label="Confirm Password"
            value={values.confirmPassword}
            onChangeText={(val) => handleChange('confirmPassword', val)}
            placeholder="Re-enter password"
            secureTextEntry
            error={errors.confirmPassword}
            required
          />
          <Button
            title="Create Account"
            onPress={() => handleSubmit(onRegister)}
            loading={isLoading}
            style={styles.registerButton}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <Button
            title="Sign In"
            variant="ghost"
            size="sm"
            onPress={() => navigation.navigate('Login')}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xxl,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
    marginTop: spacing.lg,
  },
  title: {
    ...typography.h1,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.bodySmall,
    textAlign: 'center',
  },
  errorContainer: {
    backgroundColor: '#fde8e8',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
  },
  errorText: {
    color: colors.error,
    ...typography.bodySmall,
    textAlign: 'center',
  },
  form: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  registerButton: {
    marginTop: spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.lg,
  },
  footerText: {
    ...typography.bodySmall,
  },
});

export default RegisterScreen;
