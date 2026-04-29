import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius, shadows } from '../../theme';
import { Header, Button } from '../../components/common';

const CustomerDetailsScreen = ({ navigation, route }) => {
  const { customer } = route.params;

  const measurements = [
    { label: 'Chest', value: customer.chest },
    { label: 'Waist', value: customer.waist },
    { label: 'Hips', value: customer.hips },
    { label: 'Shoulder', value: customer.shoulder },
    { label: 'Sleeve Length', value: customer.sleeveLength },
    { label: 'Inseam', value: customer.inseam },
  ].filter((m) => m.value);

  return (
    <View style={styles.container}>
      <Header
        title="Customer Details"
        showBack
        onBackPress={() => navigation.goBack()}
        rightIcon="create-outline"
        onRightPress={() =>
          navigation.navigate('AddCustomer', { customer })
        }
      />
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {customer.name?.charAt(0)?.toUpperCase()}
            </Text>
          </View>
          <Text style={styles.name}>{customer.name}</Text>

          <View style={styles.contactRow}>
            <Ionicons name="call-outline" size={16} color={colors.lightText} />
            <Text style={styles.contactText}>
              {customer.phone || 'No phone'}
            </Text>
          </View>
          {customer.email && (
            <View style={styles.contactRow}>
              <Ionicons name="mail-outline" size={16} color={colors.lightText} />
              <Text style={styles.contactText}>{customer.email}</Text>
            </View>
          )}
          {customer.address && (
            <View style={styles.contactRow}>
              <Ionicons name="location-outline" size={16} color={colors.lightText} />
              <Text style={styles.contactText}>{customer.address}</Text>
            </View>
          )}
        </View>

        {measurements.length > 0 && (
          <View style={styles.measurementsCard}>
            <Text style={styles.sectionTitle}>Measurements</Text>
            <View style={styles.measurementsGrid}>
              {measurements.map((m) => (
                <View key={m.label} style={styles.measurementItem}>
                  <Text style={styles.measurementValue}>{m.value}"</Text>
                  <Text style={styles.measurementLabel}>{m.label}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {customer.notes && (
          <View style={styles.notesCard}>
            <Text style={styles.sectionTitle}>Notes</Text>
            <Text style={styles.notesText}>{customer.notes}</Text>
          </View>
        )}

        <Button
          title="Create Order for Customer"
          onPress={() =>
            navigation.navigate('Orders', {
              screen: 'CreateOrder',
              params: { customerId: customer.id, customerName: customer.name },
            })
          }
          style={styles.orderButton}
        />

        <View style={{ height: spacing.xxl }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  profileCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    alignItems: 'center',
    marginTop: spacing.md,
    ...shadows.sm,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.highlight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.primary,
  },
  name: {
    ...typography.h2,
    marginBottom: spacing.sm,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  contactText: {
    ...typography.body,
    color: colors.lightText,
  },
  measurementsCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginTop: spacing.md,
    ...shadows.sm,
  },
  sectionTitle: {
    ...typography.h3,
    marginBottom: spacing.md,
  },
  measurementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  measurementItem: {
    width: '30%',
    backgroundColor: colors.inputBackground,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    alignItems: 'center',
  },
  measurementValue: {
    ...typography.h3,
    color: colors.primary,
    marginBottom: 2,
  },
  measurementLabel: {
    fontSize: 11,
    color: colors.lightText,
    textAlign: 'center',
  },
  notesCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginTop: spacing.md,
    ...shadows.sm,
  },
  notesText: {
    ...typography.body,
    color: colors.lightText,
    fontStyle: 'italic',
  },
  orderButton: {
    marginTop: spacing.lg,
  },
});

export default CustomerDetailsScreen;
