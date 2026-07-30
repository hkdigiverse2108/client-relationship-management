import { useCallback, useEffect, useState } from "react";
/**
 * Generic async fetcher. `fn` MUST be a stable reference (wrap in useCallback
 * upstream) — this hook re-runs whenever `fn` changes.
 */
export function useAsync(fn, deps = [], initialData = undefined) {
  const [data, setData] = useState(initialData);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const run = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fn();
      setData(result);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  useEffect(() => {
    run();
  }, [run]);
  return { data, error, loading, refetch: run, setData };
}

