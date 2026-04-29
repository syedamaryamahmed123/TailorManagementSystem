import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, borderRadius, typography, spacing, shadows } from '../../theme';

const StatCard = ({ title, value, icon, iconColor, backgroundColor }) => {
  return (
    <View style={[styles.card, backgroundColor && { backgroundColor }]}>
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: (iconColor || colors.primary) + '20' },
        ]}
      >
        <Ionicons
          name={icon}
          size={22}
          color={iconColor || colors.primary}
        />
      </View>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
    flex: 1,
    minWidth: 140,
    ...shadows.sm,
  },
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  value: {
    ...typography.h1,
    fontSize: 24,
    marginBottom: 2,
  },
  title: {
    ...typography.bodySmall,
    fontSize: 12,
    textAlign: 'center',
  },
});

export default StatCard;
