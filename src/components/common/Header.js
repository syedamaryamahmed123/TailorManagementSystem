import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, shadows } from '../../theme';

const Header = ({
  title,
  subtitle,
  showBack = false,
  onBackPress,
  rightAction,
  rightIcon,
  onRightPress,
  transparent = false,
}) => {
  return (
    <View style={[styles.container, transparent && styles.transparent]}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={transparent ? 'transparent' : colors.white}
      />
      <View style={styles.content}>
        <View style={styles.leftSection}>
          {showBack && (
            <TouchableOpacity
              onPress={onBackPress}
              style={styles.backButton}
            >
              <Ionicons
                name="chevron-back"
                size={24}
                color={colors.darkText}
              />
            </TouchableOpacity>
          )}
          <View style={styles.titleContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
            {subtitle && (
              <Text style={styles.subtitle} numberOfLines={1}>
                {subtitle}
              </Text>
            )}
          </View>
        </View>
        {(rightAction || rightIcon) && (
          <TouchableOpacity
            onPress={onRightPress}
            style={styles.rightButton}
          >
            {rightIcon ? (
              <Ionicons
                name={rightIcon}
                size={22}
                color={colors.primary}
              />
            ) : (
              <Text style={styles.rightActionText}>{rightAction}</Text>
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.md,
    paddingHorizontal: spacing.lg,
    ...shadows.sm,
  },
  transparent: {
    backgroundColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    marginRight: spacing.sm,
    padding: spacing.xs,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    ...typography.h2,
  },
  subtitle: {
    ...typography.bodySmall,
    marginTop: 2,
  },
  rightButton: {
    padding: spacing.xs,
  },
  rightActionText: {
    ...typography.button,
    color: colors.primary,
    fontSize: 14,
  },
});

export default Header;
