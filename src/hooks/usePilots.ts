import { useEffect, useState } from 'react';
import { getPilots } from '../api/stubApi';

export function usePilots() {
  const [pilots, setPilots] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPilots().then(data => {
      setPilots(data);
      setLoading(false);
    });
  }, []);

  return { pilots, loading };
} 