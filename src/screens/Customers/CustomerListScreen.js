import React, { useContext, useState, useMemo } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../../theme';
import { Header, EmptyState } from '../../components/common';
import { CustomerCard } from '../../components/cards';
import { AppContext } from '../../context';

const CustomerListScreen = ({ navigation }) => {
  const { state, dispatch } = useContext(AppContext);
  const [search, setSearch] = useState('');

  const filteredCustomers = useMemo(() => {
    if (!search.trim()) return state.customers;
    const query = search.toLowerCase();
    return state.customers.filter(
      (c) =>
        c.name?.toLowerCase().includes(query) ||
        c.phone?.toLowerCase().includes(query) ||
        c.email?.toLowerCase().includes(query)
    );
  }, [state.customers, search]);

  const handleDelete = (customer) => {
    Alert.alert(
      'Delete Customer',
      `Are you sure you want to delete ${customer.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () =>
            dispatch({ type: 'DELETE_CUSTOMER', payload: customer.id }),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Header
        title="Customers"
        subtitle={`${state.customers.length} total`}
        rightIcon="add-circle-outline"
        onRightPress={() => navigation.navigate('AddCustomer')}
      />

      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={18} color={colors.lightText} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search customers..."
          placeholderTextColor={colors.placeholder}
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <Ionicons
            name="close-circle"
            size={18}
            color={colors.lightText}
            onPress={() => setSearch('')}
          />
        )}
      </View>

      <FlatList
        data={filteredCustomers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CustomerCard
            customer={item}
            onPress={() =>
              navigation.navigate('CustomerDetails', { customer: item })
            }
            onEdit={() =>
              navigation.navigate('AddCustomer', { customer: item })
            }
            onDelete={handleDelete}
          />
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState
            icon="people-outline"
            title="No customers yet"
            message="Add your first customer to get started"
            actionTitle="Add Customer"
            onAction={() => navigation.navigate('AddCustomer')}
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    marginHorizontal: spacing.md,
    marginVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchInput: {
    flex: 1,
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.sm,
    fontSize: 14,
    color: colors.darkText,
  },
  list: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xxl,
  },
});

export default CustomerListScreen;
