/**
 * Tema da aplicação
 * Define cores, espaçamentos, tipografia e estilos globais
 */

// Paleta de cores
export const colors = {
  // Cores primárias
  primary: '#3b82f6',
  primaryLight: '#93c5fd',
  primaryDark: '#1e40af',
  
  // Success
  success: '#10b981',
  successLight: '#34d399',
  
  // Warning
  warning: '#f59e0b',
  
  // Danger
  danger: '#ef4444',
  dangerLight: '#f87171',
  
  // Neutral
  white: '#ffffff',
  black: '#000000',
  gray100: '#f3f4f6',
  gray200: '#e5e7eb',
  gray300: '#d1d5db',
  gray400: '#9ca3af',
  gray500: '#6b7280',
  gray600: '#4b5563',
  gray700: '#374151',
  gray800: '#1f2937',
  gray900: '#111827',
  
  // Semantic
  background: '#f3f4f6',
  surface: '#ffffff',
  text: '#21cf12',
  textSecondary: '#6b7280',
  border: '#e5e7eb',
};

// Espaçamentos padronizados
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

// Configurações de tipografia
export const typography = {
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
};

// Raios de borda
export const borderRadius = {
  sm: 4,
  md: 6,
  lg: 8,
  xl: 12,
  full: 9999,
};

// Sombras para elevação
export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
};