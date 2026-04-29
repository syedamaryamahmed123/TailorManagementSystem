import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, borderRadius, spacing } from '../../theme';

const statusColors = {
  pending: { bg: '#fef3e2', text: colors.statusPending },
  'in progress': { bg: '#e8ecf4', text: colors.statusInProgress },
  completed: { bg: '#e8f5e9', text: colors.statusCompleted },
  default: { bg: colors.highlight, text: colors.primary },
};

const Badge = ({ status, label, style }) => {
  const key = status ? status.toLowerCase() : 'default';
  const colorSet = statusColors[key] || statusColors.default;
  const displayText = label || status;

  return (
    <View style={[styles.badge, { backgroundColor: colorSet.bg }, style]}>
      <Text style={[styles.text, { color: colorSet.text }]}>
        {displayText}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm + 2,
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});

export default Badge;
