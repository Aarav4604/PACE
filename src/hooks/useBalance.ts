import { useEffect, useState } from 'react';
import { getBalance } from '../api/stubApi';

export function useBalance() {
  const [balance, setBalance] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBalance().then(data => {
      setBalance(data);
      setLoading(false);
    });
  }, []);

  return { balance, loading };
} 