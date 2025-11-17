import { useCallback, useEffect, useState } from 'react';

export default function useFetch<T>(fn: () => Promise<T>, deps: any[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fn();
      setData(res);
      return res;
    } catch (e: any) {
      setError(e?.message || String(e));
      setData(null);
      throw e;
    } finally {
      setLoading(false);
    }
  }, /* eslint-disable-line react-hooks/exhaustive-deps */ deps);

  useEffect(() => {
    // automatically load on mount / deps change
    load().catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return {
    data,
    loading,
    error,
    refetch: load,
  } as {
    data: T | null;
    loading: boolean;
    error: string | null;
    refetch: () => Promise<T>;
  };
}