export const darkTheme = {
  colors: {
    background: '#181A20',
    card: '#23262F',
    cardGradient: ['#23262F', '#181A20'],
    accent: '#4F8CFF',
    textPrimary: '#FFFFFF',
    textSecondary: '#A0A4B8',
    border: '#23262F',
    positive: '#50D18D',
    negative: '#FF5B5B',
    muted: '#23262F',
    button: '#23262F',
    buttonText: '#FFFFFF',
    shadow: '#000000',
  },
  font: {
    family: 'System',
    size: {
      h1: 32,
      h2: 24,
      h3: 20,
      body: 16,
      small: 13,
    },
    weight: {
      regular: 'normal',
      bold: 'bold',
      semibold: '600',
    },
  },
  radius: {
    card: 24,
    button: 18,
  },
  spacing: (n: number) => n * 8,
};

export type Theme = typeof darkTheme; 