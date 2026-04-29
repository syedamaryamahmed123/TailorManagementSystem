import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { colors, spacing, borderRadius, typography } from '../../theme';
import { Header, Button, Input } from '../../components/common';
import { useForm } from '../../hooks';
import { AppContext } from '../../context';

const STATUS_OPTIONS = ['Pending', 'In Progress', 'Completed'];

const validateOrder = (values) => {
  const errors = {};
  if (!values.customerName?.trim())
    errors.customerName = 'Customer name is required';
  if (!values.garmentType?.trim())
    errors.garmentType = 'Garment type is required';
  return errors;
};

const CreateOrderScreen = ({ navigation, route }) => {
  const { dispatch } = useContext(AppContext);
  const prefilledCustomer = route.params?.customerName || '';

  const { values, errors, handleChange, handleSubmit } = useForm(
    {
      customerName: prefilledCustomer,
      customerId: route.params?.customerId || '',
      garmentType: '',
      price: '',
      deliveryDate: '',
      status: 'Pending',
      notes: '',
      fabric: '',
      quantity: '1',
    },
    validateOrder
  );

  const [selectedStatus, setSelectedStatus] = useState('Pending');

  const onSave = (formValues) => {
    dispatch({
      type: 'ADD_ORDER',
      payload: {
        ...formValues,
        status: selectedStatus,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      },
    });
    Alert.alert('Success', 'Order created successfully!', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <View style={styles.container}>
      <Header
        title="Create Order"
        showBack
        onBackPress={() => navigation.goBack()}
      />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.section}>
            <Input
              label="Customer Name"
              value={values.customerName}
              onChangeText={(val) => handleChange('customerName', val)}
              placeholder="Select or type customer name"
              error={errors.customerName}
              required
            />
            <Input
              label="Garment Type"
              value={values.garmentType}
              onChangeText={(val) => handleChange('garmentType', val)}
              placeholder="e.g., Dress, Suit, Blouse"
              error={errors.garmentType}
              required
            />
            <Input
              label="Fabric"
              value={values.fabric}
              onChangeText={(val) => handleChange('fabric', val)}
              placeholder="e.g., Silk, Cotton, Linen"
            />
            <View style={styles.row}>
              <Input
                label="Price"
                value={values.price}
                onChangeText={(val) => handleChange('price', val)}
                placeholder="0.00"
                keyboardType="decimal-pad"
                style={styles.halfInput}
              />
              <Input
                label="Quantity"
                value={values.quantity}
                onChangeText={(val) => handleChange('quantity', val)}
                placeholder="1"
                keyboardType="number-pad"
                style={styles.halfInput}
              />
            </View>
            <Input
              label="Delivery Date"
              value={values.deliveryDate}
              onChangeText={(val) => handleChange('deliveryDate', val)}
              placeholder="YYYY-MM-DD"
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionLabel}>STATUS</Text>
            <View style={styles.statusRow}>
              {STATUS_OPTIONS.map((status) => (
                <TouchableOpacity
                  key={status}
                  style={[
                    styles.statusOption,
                    selectedStatus === status && styles.statusSelected,
                  ]}
                  onPress={() => setSelectedStatus(status)}
                >
                  <Text
                    style={[
                      styles.statusText,
                      selectedStatus === status && styles.statusTextSelected,
                    ]}
                  >
                    {status}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Input
              label="Notes"
              value={values.notes}
              onChangeText={(val) => handleChange('notes', val)}
              placeholder="Special instructions, preferences..."
              multiline
              numberOfLines={4}
            />
          </View>

          <Button
            title="Create Order"
            onPress={() => handleSubmit(onSave)}
            style={styles.saveButton}
          />

          <View style={{ height: spacing.xxl }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  section: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginTop: spacing.md,
  },
  sectionLabel: {
    ...typography.label,
    marginBottom: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  halfInput: {
    flex: 1,
  },
  statusRow: {
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
  statusSelected: {
    backgroundColor: colors.primary + '15',
    borderColor: colors.primary,
  },
  statusText: {
    ...typography.bodySmall,
    fontWeight: '600',
    fontSize: 12,
  },
  statusTextSelected: {
    color: colors.primary,
  },
  saveButton: {
    marginTop: spacing.lg,
  },
});

export default CreateOrderScreen;
