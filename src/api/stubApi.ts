// Stub API for pilots, transactions, and balance

export const getPilots = async () => [
  { id: 1, name: 'Tech Momentum', ytd: 12.4 },
  { id: 2, name: 'Dividend Kings', ytd: 7.1 },
];

export const getTransactions = async () => [
  { id: 1, title: 'Starbucks', subtitle: 'Food & Drink', amount: -5.75 },
  { id: 2, title: 'PayPal', subtitle: 'Transfers', amount: 50.0 },
  { id: 3, title: 'Walmart', subtitle: 'Groceries', amount: -45.23 },
  { id: 4, title: 'Netflix', subtitle: 'Entertainment', amount: -15.99 },
  { id: 5, title: 'Apple Store', subtitle: 'Electronics', amount: -199.0 },
  { id: 6, title: 'Uber', subtitle: 'Transportation', amount: -12.4 },
  { id: 7, title: 'Airbnb', subtitle: 'Travel', amount: -250.0 },
];

export const getBalance = async () => '4,923.82'; 