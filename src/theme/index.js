/**
 * Centralized Theme Configuration
 * Pastel color palette for the Tailor Management System
 */

export const colors = {
  primary: '#8e9aaf',       // Lavender Grey
  secondary: '#cbc0d3',     // Thistle
  accent: '#efd3d7',        // Soft Blush
  highlight: '#feeafa',     // Lavender Veil
  background: '#dee2ff',    // Lavender

  white: '#ffffff',
  black: '#1a1a2e',
  darkText: '#2d2d3f',
  lightText: '#6b6b80',
  placeholder: '#a0a0b2',
  border: '#d8d8e8',
  error: '#e74c3c',
  success: '#27ae60',
  warning: '#f39c12',

  cardBackground: '#ffffff',
  inputBackground: '#f8f6ff',
  overlay: 'rgba(0, 0, 0, 0.4)',

  statusPending: '#f39c12',
  statusInProgress: '#8e9aaf',
  statusCompleted: '#27ae60',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 999,
};

export const typography = {
  h1: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2d2d3f',
    letterSpacing: 0.3,
  },
  h2: {
    fontSize: 22,
    fontWeight: '600',
    color: '#2d2d3f',
    letterSpacing: 0.2,
  },
  h3: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2d2d3f',
  },
  body: {
    fontSize: 15,
    fontWeight: '400',
    color: '#2d2d3f',
    lineHeight: 22,
  },
  bodySmall: {
    fontSize: 13,
    fontWeight: '400',
    color: '#6b6b80',
    lineHeight: 18,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6b6b80',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  button: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
};

export const shadows = {
  sm: {
    shadowColor: '#8e9aaf',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#8e9aaf',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#8e9aaf',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.16,
    shadowRadius: 12,
    elevation: 6,
  },
};

const theme = {
  colors,
  spacing,
  borderRadius,
  typography,
  shadows,
};

export default theme;
