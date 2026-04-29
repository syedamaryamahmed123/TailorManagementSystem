import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OrderListScreen from '../screens/Orders/OrderListScreen';
import CreateOrderScreen from '../screens/Orders/CreateOrderScreen';
import OrderDetailsScreen from '../screens/Orders/OrderDetailsScreen';

const Stack = createStackNavigator();

const OrderNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OrderList" component={OrderListScreen} />
      <Stack.Screen name="CreateOrder" component={CreateOrderScreen} />
      <Stack.Screen name="OrderDetails" component={OrderDetailsScreen} />
    </Stack.Navigator>
  );
};

export default OrderNavigator;
