import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { colors, shadows } from '../theme';
import DashboardScreen from '../screens/Dashboard/DashboardScreen';
import CustomerNavigator from './CustomerNavigator';
import OrderNavigator from './OrderNavigator';
import DesignScreen from '../screens/Designs/DesignScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';

const Tab = createBottomTabNavigator();

const tabIcons = {
  Dashboard: { active: 'grid', inactive: 'grid-outline' },
  Customers: { active: 'people', inactive: 'people-outline' },
  Orders: { active: 'receipt', inactive: 'receipt-outline' },
  Designs: { active: 'color-palette', inactive: 'color-palette-outline' },
  Profile: { active: 'person', inactive: 'person-outline' },
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, size }) => {
          const icons = tabIcons[route.name];
          const iconName = focused ? icons.active : icons.inactive;
          return (
            <View style={focused ? styles.activeTab : null}>
              <Ionicons
                name={iconName}
                size={focused ? 22 : 20}
                color={focused ? colors.primary : colors.lightText}
              />
            </View>
          );
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.lightText,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Customers" component={CustomerNavigator} />
      <Tab.Screen name="Orders" component={OrderNavigator} />
      <Tab.Screen name="Designs" component={DesignScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.white,
    borderTopWidth: 0,
    paddingTop: 8,
    paddingBottom: 8,
    height: 65,
    ...shadows.md,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  activeTab: {
    backgroundColor: colors.highlight,
    borderRadius: 12,
    padding: 6,
  },
});

export default TabNavigator;
