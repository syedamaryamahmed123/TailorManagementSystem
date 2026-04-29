import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius, shadows } from '../../theme';
import { Header } from '../../components/common';
import { StatCard, OrderCard } from '../../components/cards';
import { useAuth } from '../../hooks';
import { AppContext } from '../../context';

const DashboardScreen = ({ navigation }) => {
  const { user } = useAuth();
  const { state, dispatch } = useContext(AppContext);

  const stats = {
    totalCustomers: state.customers.length,
    totalOrders: state.orders.length,
    pendingOrders: state.orders.filter((o) => o.status === 'Pending').length,
    completedOrders: state.orders.filter((o) => o.status === 'Completed').length,
  };

  const recentOrders = state.orders.slice(0, 5);

  const onRefresh = () => {
    dispatch({ type: 'SET_REFRESHING', payload: true });
    setTimeout(() => {
      dispatch({ type: 'SET_REFRESHING', payload: false });
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Header
        title={`Hello, ${user?.name || 'Tailor'}!`}
        subtitle="Here's your business overview"
        rightIcon="notifications-outline"
        onRightPress={() => {}}
      />
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={state.isRefreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
          />
        }
      >
        <View style={styles.statsRow}>
          <StatCard
            title="Customers"
            value={stats.totalCustomers}
            icon="people-outline"
            iconColor={colors.primary}
          />
          <View style={{ width: spacing.sm }} />
          <StatCard
            title="Orders"
            value={stats.totalOrders}
            icon="receipt-outline"
            iconColor="#8e9aaf"
          />
        </View>
        <View style={styles.statsRow}>
          <StatCard
            title="Pending"
            value={stats.pendingOrders}
            icon="time-outline"
            iconColor={colors.statusPending}
          />
          <View style={{ width: spacing.sm }} />
          <StatCard
            title="Completed"
            value={stats.completedOrders}
            icon="checkmark-circle-outline"
            iconColor={colors.statusCompleted}
          />
        </View>

        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsRow}>
            <QuickAction
              icon="person-add-outline"
              label="Add Customer"
              onPress={() => navigation.navigate('Customers', { screen: 'AddCustomer' })}
            />
            <QuickAction
              icon="add-circle-outline"
              label="New Order"
              onPress={() => navigation.navigate('Orders', { screen: 'CreateOrder' })}
            />
            <QuickAction
              icon="images-outline"
              label="Designs"
              onPress={() => navigation.navigate('Designs')}
            />
          </View>
        </View>

        <View style={styles.recentSection}>
          <Text style={styles.sectionTitle}>Recent Orders</Text>
          {recentOrders.length > 0 ? (
            recentOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onPress={() =>
                  navigation.navigate('Orders', {
                    screen: 'OrderDetails',
                    params: { order },
                  })
                }
              />
            ))
          ) : (
            <View style={styles.emptyRecent}>
              <Ionicons
                name="receipt-outline"
                size={32}
                color={colors.secondary}
              />
              <Text style={styles.emptyText}>No orders yet</Text>
            </View>
          )}
        </View>

        <View style={{ height: spacing.xxl }} />
      </ScrollView>
    </View>
  );
};

const QuickAction = ({ icon, label, onPress }) => (
  <View style={styles.quickActionItem}>
    <View style={styles.quickActionButton}>
      <Ionicons
        name={icon}
        size={24}
        color={colors.primary}
        onPress={onPress}
      />
    </View>
    <Text style={styles.quickActionLabel}>{label}</Text>
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
  statsRow: {
    flexDirection: 'row',
    marginTop: spacing.sm,
  },
  sectionTitle: {
    ...typography.h3,
    marginBottom: spacing.md,
  },
  quickActions: {
    marginTop: spacing.lg,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.lg,
    ...shadows.sm,
  },
  quickActionItem: {
    alignItems: 'center',
  },
  quickActionButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.highlight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  quickActionLabel: {
    ...typography.bodySmall,
    fontSize: 12,
    fontWeight: '500',
  },
  recentSection: {
    marginTop: spacing.lg,
  },
  emptyRecent: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.lg,
  },
  emptyText: {
    ...typography.bodySmall,
    marginTop: spacing.sm,
  },
});

export default DashboardScreen;
