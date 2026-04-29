import React, { useContext } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { colors, spacing, borderRadius } from '../../theme';
import { Header, Button, Input } from '../../components/common';
import { useForm } from '../../hooks';
import { AppContext } from '../../context';

const validateCustomer = (values) => {
  const errors = {};
  if (!values.name?.trim()) errors.name = 'Name is required';
  if (!values.phone?.trim()) errors.phone = 'Phone is required';
  return errors;
};

const AddCustomerScreen = ({ navigation, route }) => {
  const existingCustomer = route.params?.customer;
  const isEditing = !!existingCustomer;
  const { dispatch } = useContext(AppContext);

  const initialValues = existingCustomer || {
    name: '',
    phone: '',
    email: '',
    address: '',
    notes: '',
    chest: '',
    waist: '',
    hips: '',
    shoulder: '',
    sleeveLength: '',
    inseam: '',
  };

  const { values, errors, handleChange, handleSubmit } = useForm(
    initialValues,
    validateCustomer
  );

  const onSave = (formValues) => {
    if (isEditing) {
      dispatch({
        type: 'UPDATE_CUSTOMER',
        payload: { ...formValues, id: existingCustomer.id },
      });
    } else {
      dispatch({
        type: 'ADD_CUSTOMER',
        payload: { ...formValues, id: Date.now().toString() },
      });
    }
    Alert.alert(
      'Success',
      `Customer ${isEditing ? 'updated' : 'added'} successfully!`,
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  return (
    <View style={styles.container}>
      <Header
        title={isEditing ? 'Edit Customer' : 'Add Customer'}
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
              label="Full Name"
              value={values.name}
              onChangeText={(val) => handleChange('name', val)}
              placeholder="Customer name"
              error={errors.name}
              required
            />
            <Input
              label="Phone"
              value={values.phone}
              onChangeText={(val) => handleChange('phone', val)}
              placeholder="+1 (555) 000-0000"
              keyboardType="phone-pad"
              error={errors.phone}
              required
            />
            <Input
              label="Email"
              value={values.email}
              onChangeText={(val) => handleChange('email', val)}
              placeholder="customer@email.com"
              keyboardType="email-address"
            />
            <Input
              label="Address"
              value={values.address}
              onChangeText={(val) => handleChange('address', val)}
              placeholder="Customer address"
              multiline
            />
            <Input
              label="Notes"
              value={values.notes}
              onChangeText={(val) => handleChange('notes', val)}
              placeholder="Additional notes..."
              multiline
              numberOfLines={3}
            />
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Input
                label="Chest (in)"
                value={values.chest}
                onChangeText={(val) => handleChange('chest', val)}
                placeholder="0"
                keyboardType="numeric"
                style={styles.measurementInput}
              />
              <Input
                label="Waist (in)"
                value={values.waist}
                onChangeText={(val) => handleChange('waist', val)}
                placeholder="0"
                keyboardType="numeric"
                style={styles.measurementInput}
              />
            </View>
            <View style={styles.sectionHeader}>
              <Input
                label="Hips (in)"
                value={values.hips}
                onChangeText={(val) => handleChange('hips', val)}
                placeholder="0"
                keyboardType="numeric"
                style={styles.measurementInput}
              />
              <Input
                label="Shoulder (in)"
                value={values.shoulder}
                onChangeText={(val) => handleChange('shoulder', val)}
                placeholder="0"
                keyboardType="numeric"
                style={styles.measurementInput}
              />
            </View>
            <View style={styles.sectionHeader}>
              <Input
                label="Sleeve Length (in)"
                value={values.sleeveLength}
                onChangeText={(val) => handleChange('sleeveLength', val)}
                placeholder="0"
                keyboardType="numeric"
                style={styles.measurementInput}
              />
              <Input
                label="Inseam (in)"
                value={values.inseam}
                onChangeText={(val) => handleChange('inseam', val)}
                placeholder="0"
                keyboardType="numeric"
                style={styles.measurementInput}
              />
            </View>
          </View>

          <Button
            title={isEditing ? 'Update Customer' : 'Add Customer'}
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
  sectionHeader: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  measurementInput: {
    flex: 1,
  },
  saveButton: {
    marginTop: spacing.lg,
  },
});

export default AddCustomerScreen;
