// Minimal stubs for @pace/ui-kit

export type Theme = {
  colors: Record<string, string>;
  [key: string]: any;
};

export type ThemeMode = 'light' | 'dark';

export function getTheme(mode: ThemeMode): Theme {
  return {
    colors: {
      primary: mode === 'dark' ? '#000' : '#fff',
      accent: '#2563EB',
      bg: mode === 'dark' ? '#111' : '#f9f9f9',
      card: '#fff',
      textPrimary: '#222',
      textSecondary: '#666',
    },
  };
} 