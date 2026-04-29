import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { colors, spacing, typography, borderRadius } from '../../theme';
import { Button, Input } from '../../components/common';
import { useAuth, useForm } from '../../hooks';

const validateLogin = (values) => {
  const errors = {};
  if (!values.email?.trim()) errors.email = 'Email is required';
  else if (!/\S+@\S+\.\S+/.test(values.email))
    errors.email = 'Enter a valid email';
  if (!values.password?.trim()) errors.password = 'Password is required';
  else if (values.password.length < 6)
    errors.password = 'Password must be at least 6 characters';
  return errors;
};

const LoginScreen = ({ navigation }) => {
  const { login, isLoading, error } = useAuth();
  const { values, errors, handleChange, handleSubmit } = useForm(
    { email: '', password: '' },
    validateLogin
  );

  const onLogin = async (formValues) => {
    await login(formValues.email, formValues.password);
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
          <View style={styles.logoContainer}>
            <Text style={styles.logoIcon}>✂️</Text>
          </View>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>
            Sign in to manage your tailoring business
          </Text>
        </View>

        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <View style={styles.form}>
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
            label="Password"
            value={values.password}
            onChangeText={(val) => handleChange('password', val)}
            placeholder="Enter your password"
            secureTextEntry
            error={errors.password}
            required
          />
          <Button
            title="Sign In"
            onPress={() => handleSubmit(onLogin)}
            loading={isLoading}
            style={styles.loginButton}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don&apos;t have an account? </Text>
          <Button
            title="Sign Up"
            variant="ghost"
            size="sm"
            onPress={() => navigation.navigate('Register')}
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
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xxl,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  logoIcon: {
    fontSize: 36,
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
  loginButton: {
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

export default LoginScreen;
