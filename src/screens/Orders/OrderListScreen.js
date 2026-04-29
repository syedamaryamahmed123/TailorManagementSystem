import React, { useContext, useState, useMemo } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import { colors, spacing, borderRadius, typography } from '../../theme';
import { Header, EmptyState } from '../../components/common';
import { OrderCard } from '../../components/cards';
import { AppContext } from '../../context';

const FILTERS = ['All', 'Pending', 'In Progress', 'Completed'];

const OrderListScreen = ({ navigation }) => {
  const { state } = useContext(AppContext);
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredOrders = useMemo(() => {
    if (activeFilter === 'All') return state.orders;
    return state.orders.filter((o) => o.status === activeFilter);
  }, [state.orders, activeFilter]);

  return (
    <View style={styles.container}>
      <Header
        title="Orders"
        subtitle={`${state.orders.length} total`}
        rightIcon="add-circle-outline"
        onRightPress={() => navigation.navigate('CreateOrder')}
      />

      <View style={styles.filterContainer}>
        {FILTERS.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterButton,
              activeFilter === filter && styles.filterActive,
            ]}
            onPress={() => setActiveFilter(filter)}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === filter && styles.filterTextActive,
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredOrders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <OrderCard
            order={item}
            onPress={() =>
              navigation.navigate('OrderDetails', { order: item })
            }
          />
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState
            icon="receipt-outline"
            title="No orders found"
            message="Create your first order to track your work"
            actionTitle="New Order"
            onAction={() => navigation.navigate('CreateOrder')}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  filterButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.full,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterText: {
    ...typography.bodySmall,
    fontSize: 12,
    fontWeight: '600',
  },
  filterTextActive: {
    color: colors.white,
  },
  list: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xxl,
  },
});

export default OrderListScreen;
