import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, borderRadius, typography, spacing, shadows } from '../../theme';
import Badge from '../common/Badge';

const OrderCard = ({ order, onPress }) => {
  const formattedDate = order.deliveryDate
    ? new Date(order.deliveryDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'No date set';

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(order)}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={styles.orderInfo}>
          <Text style={styles.orderId}>#{order.id?.slice(-6) || '000000'}</Text>
          <Text style={styles.customerName} numberOfLines={1}>
            {order.customerName || 'Unknown Customer'}
          </Text>
        </View>
        <Badge status={order.status} />
      </View>

      <View style={styles.details}>
        <View style={styles.detailItem}>
          <Ionicons name="shirt-outline" size={14} color={colors.lightText} />
          <Text style={styles.detailText}>
            {order.garmentType || 'Custom'}
          </Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="calendar-outline" size={14} color={colors.lightText} />
          <Text style={styles.detailText}>{formattedDate}</Text>
        </View>
        {order.price && (
          <View style={styles.detailItem}>
            <Ionicons name="cash-outline" size={14} color={colors.lightText} />
            <Text style={styles.detailText}>${order.price}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm + 2,
    ...shadows.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  orderInfo: {
    flex: 1,
    marginRight: spacing.sm,
  },
  orderId: {
    ...typography.label,
    fontSize: 11,
    color: colors.primary,
    marginBottom: 2,
  },
  customerName: {
    ...typography.h3,
    fontSize: 16,
  },
  details: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  detailText: {
    ...typography.bodySmall,
    fontSize: 12,
  },
});

export default OrderCard;
