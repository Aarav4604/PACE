import { useEffect, useState } from 'react';
import { getTransactions } from '../api/stubApi';

export function useTransactions() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTransactions().then(data => {
      setTransactions(data);
      setLoading(false);
    });
  }, []);

  return { transactions, loading };
} 