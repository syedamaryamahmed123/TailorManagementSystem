import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius, shadows } from '../../theme';
import { Header, Button, Badge } from '../../components/common';
import { AppContext } from '../../context';

const STATUS_OPTIONS = ['Pending', 'In Progress', 'Completed'];

const OrderDetailsScreen = ({ navigation, route }) => {
  const { order } = route.params;
  const { dispatch } = useContext(AppContext);
  const [currentStatus, setCurrentStatus] = useState(order.status);

  const handleStatusChange = (newStatus) => {
    setCurrentStatus(newStatus);
    dispatch({
      type: 'UPDATE_ORDER',
      payload: { ...order, status: newStatus },
    });
    Alert.alert('Status Updated', `Order status changed to ${newStatus}`);
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Order',
      'Are you sure you want to delete this order?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            dispatch({ type: 'DELETE_ORDER', payload: order.id });
            navigation.goBack();
          },
        },
      ]
    );
  };

  const deliveryDate = order.deliveryDate
    ? new Date(order.deliveryDate).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Not set';

  return (
    <View style={styles.container}>
      <Header
        title="Order Details"
        showBack
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <View style={styles.orderHeader}>
            <View>
              <Text style={styles.orderId}>
                Order #{order.id?.slice(-6)}
              </Text>
              <Text style={styles.customerName}>{order.customerName}</Text>
            </View>
            <Badge status={currentStatus} />
          </View>

          <View style={styles.divider} />

          <DetailRow
            icon="shirt-outline"
            label="Garment"
            value={order.garmentType || 'Custom'}
          />
          {order.fabric && (
            <DetailRow icon="layers-outline" label="Fabric" value={order.fabric} />
          )}
          <DetailRow
            icon="calendar-outline"
            label="Delivery"
            value={deliveryDate}
          />
          {order.price && (
            <DetailRow
              icon="cash-outline"
              label="Price"
              value={`$${order.price}`}
            />
          )}
          {order.quantity && (
            <DetailRow
              icon="copy-outline"
              label="Quantity"
              value={order.quantity}
            />
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Update Status</Text>
          <View style={styles.statusOptions}>
            {STATUS_OPTIONS.map((status) => (
              <TouchableOpacity
                key={status}
                style={[
                  styles.statusOption,
                  currentStatus === status && styles.statusActive,
                ]}
                onPress={() => handleStatusChange(status)}
              >
                <Text
                  style={[
                    styles.statusText,
                    currentStatus === status && styles.statusTextActive,
                  ]}
                >
                  {status}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {order.notes && (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Notes</Text>
            <Text style={styles.notesText}>{order.notes}</Text>
          </View>
        )}

        <Button
          title="Delete Order"
          variant="outline"
          onPress={handleDelete}
          style={styles.deleteButton}
          textStyle={{ color: colors.error }}
        />

        <View style={{ height: spacing.xxl }} />
      </ScrollView>
    </View>
  );
};

const DetailRow = ({ icon, label, value }) => (
  <View style={styles.detailRow}>
    <Ionicons name={icon} size={18} color={colors.lightText} />
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginTop: spacing.md,
    ...shadows.sm,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  orderId: {
    ...typography.label,
    color: colors.primary,
    marginBottom: 4,
  },
  customerName: {
    ...typography.h2,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  detailLabel: {
    ...typography.bodySmall,
    fontWeight: '600',
    width: 80,
  },
  detailValue: {
    ...typography.body,
    flex: 1,
  },
  sectionTitle: {
    ...typography.h3,
    marginBottom: spacing.md,
  },
  statusOptions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  statusOption: {
    flex: 1,
    paddingVertical: spacing.sm + 2,
    borderRadius: borderRadius.md,
    backgroundColor: colors.inputBackground,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  statusActive: {
    backgroundColor: colors.primary + '15',
    borderColor: colors.primary,
  },
  statusText: {
    ...typography.bodySmall,
    fontWeight: '600',
    fontSize: 12,
  },
  statusTextActive: {
    color: colors.primary,
  },
  notesText: {
    ...typography.body,
    color: colors.lightText,
    fontStyle: 'italic',
  },
  deleteButton: {
    marginTop: spacing.lg,
    borderColor: colors.error,
  },
});

export default OrderDetailsScreen;
