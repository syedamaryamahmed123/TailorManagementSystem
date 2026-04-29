import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, borderRadius, typography, spacing, shadows } from '../../theme';

const CustomerCard = ({ customer, onPress, onEdit, onDelete }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(customer)}
      activeOpacity={0.7}
    >
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {customer.name?.charAt(0)?.toUpperCase() || '?'}
        </Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {customer.name}
        </Text>
        <Text style={styles.detail} numberOfLines={1}>
          {customer.phone || 'No phone'}
        </Text>
        {customer.notes && (
          <Text style={styles.notes} numberOfLines={1}>
            {customer.notes}
          </Text>
        )}
      </View>
      <View style={styles.actions}>
        {onEdit && (
          <TouchableOpacity
            onPress={() => onEdit(customer)}
            style={styles.actionButton}
          >
            <Ionicons name="create-outline" size={18} color={colors.primary} />
          </TouchableOpacity>
        )}
        {onDelete && (
          <TouchableOpacity
            onPress={() => onDelete(customer)}
            style={styles.actionButton}
          >
            <Ionicons name="trash-outline" size={18} color={colors.error} />
          </TouchableOpacity>
        )}
        <Ionicons name="chevron-forward" size={18} color={colors.lightText} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm + 2,
    ...shadows.sm,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.highlight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
  info: {
    flex: 1,
  },
  name: {
    ...typography.h3,
    fontSize: 16,
  },
  detail: {
    ...typography.bodySmall,
    marginTop: 2,
  },
  notes: {
    ...typography.bodySmall,
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 2,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  actionButton: {
    padding: spacing.xs,
  },
});

export default CustomerCard;
