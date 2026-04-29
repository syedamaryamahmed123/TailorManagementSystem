import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CustomerListScreen from '../screens/Customers/CustomerListScreen';
import AddCustomerScreen from '../screens/Customers/AddCustomerScreen';
import CustomerDetailsScreen from '../screens/Customers/CustomerDetailsScreen';

const Stack = createStackNavigator();

const CustomerNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CustomerList" component={CustomerListScreen} />
      <Stack.Screen name="AddCustomer" component={AddCustomerScreen} />
      <Stack.Screen name="CustomerDetails" component={CustomerDetailsScreen} />
    </Stack.Navigator>
  );
};

export default CustomerNavigator;
