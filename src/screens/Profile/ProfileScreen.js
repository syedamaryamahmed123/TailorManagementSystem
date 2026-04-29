import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius, shadows } from '../../theme';
import { Header, Button, Modal, Input } from '../../components/common';
import { useAuth } from '../../hooks';

const ProfileScreen = () => {
  const { user, logout } = useAuth();
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign Out', style: 'destructive', onPress: logout },
    ]);
  };

  const handleSaveProfile = () => {
    setEditModalVisible(false);
    Alert.alert('Success', 'Profile updated successfully!');
  };

  return (
    <View style={styles.container}>
      <Header title="Profile & Settings" />
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.name?.charAt(0)?.toUpperCase() || 'T'}
            </Text>
          </View>
          <Text style={styles.name}>{user?.name || 'Tailor Name'}</Text>
          <Text style={styles.email}>{user?.email || 'tailor@email.com'}</Text>
          <Button
            title="Edit Profile"
            variant="outline"
            size="sm"
            onPress={() => setEditModalVisible(true)}
            style={styles.editButton}
          />
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <SettingsRow
            icon="notifications-outline"
            label="Push Notifications"
            rightElement={
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={colors.white}
              />
            }
          />
          <SettingsRow icon="language-outline" label="Language" value="English" />
          <SettingsRow icon="moon-outline" label="Dark Mode" value="Off" />
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Business</Text>
          <SettingsRow
            icon="business-outline"
            label="Business Name"
            value={user?.name || 'My Tailoring Shop'}
          />
          <SettingsRow
            icon="call-outline"
            label="Phone"
            value={user?.phone || 'Not set'}
          />
          <SettingsRow
            icon="location-outline"
            label="Address"
            value="Not set"
          />
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Support</Text>
          <SettingsRow icon="help-circle-outline" label="Help Center" />
          <SettingsRow icon="chatbubble-outline" label="Contact Support" />
          <SettingsRow icon="document-text-outline" label="Terms of Service" />
          <SettingsRow icon="shield-outline" label="Privacy Policy" />
        </View>

        <Button
          title="Sign Out"
          variant="outline"
          onPress={handleLogout}
          style={styles.logoutButton}
          textStyle={{ color: colors.error }}
        />

        <Text style={styles.version}>Version 1.0.0</Text>

        <View style={{ height: spacing.xxl }} />
      </ScrollView>

      <Modal
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        title="Edit Profile"
      >
        <View style={styles.modalContent}>
          <Input
            label="Business Name"
            value={name}
            onChangeText={setName}
            placeholder="Your business name"
          />
          <Input
            label="Phone"
            value={phone}
            onChangeText={setPhone}
            placeholder="Phone number"
            keyboardType="phone-pad"
          />
          <Button
            title="Save Changes"
            onPress={handleSaveProfile}
            style={styles.saveButton}
          />
        </View>
      </Modal>
    </View>
  );
};

const SettingsRow = ({ icon, label, value, rightElement, onPress }) => (
  <TouchableOpacity
    style={styles.settingsRow}
    onPress={onPress}
    disabled={!onPress && !rightElement}
    activeOpacity={0.7}
  >
    <View style={styles.settingsLeft}>
      <Ionicons name={icon} size={20} color={colors.primary} />
      <Text style={styles.settingsLabel}>{label}</Text>
    </View>
    {rightElement || (
      <View style={styles.settingsRight}>
        {value && <Text style={styles.settingsValue}>{value}</Text>}
        <Ionicons name="chevron-forward" size={16} color={colors.lightText} />
      </View>
    )}
  </TouchableOpacity>
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
    marginBottom: spacing.xs,
  },
  email: {
    ...typography.bodySmall,
  },
  editButton: {
    marginTop: spacing.md,
  },
  sectionCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    marginTop: spacing.md,
    ...shadows.sm,
  },
  sectionTitle: {
    ...typography.label,
    paddingHorizontal: spacing.sm,
    marginBottom: spacing.sm,
  },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.sm,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border,
  },
  settingsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  settingsLabel: {
    ...typography.body,
    fontSize: 14,
  },
  settingsRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  settingsValue: {
    ...typography.bodySmall,
    fontSize: 13,
  },
  logoutButton: {
    marginTop: spacing.lg,
    borderColor: colors.error,
  },
  version: {
    ...typography.bodySmall,
    textAlign: 'center',
    marginTop: spacing.md,
  },
  modalContent: {
    paddingVertical: spacing.md,
  },
  saveButton: {
    marginTop: spacing.sm,
  },
});

export default ProfileScreen;
