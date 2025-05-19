import { useState, useEffect, useRef, useCallback } from "react";

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const fetchRef = useRef(fetchFunction);

  useEffect(() => {
    fetchRef.current = fetchFunction;
  }, [fetchFunction]);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await fetchRef.current();
      setData(result);
    }
    catch (err) {
      setError(
        err instanceof Error ? err : new Error("An unknown error occurred")
      );
    }
    finally {
      setLoading(false);
    }
  }, []);

  const reset = () => {
    setData(null);
    setError(null);
    setLoading(false);
  };

  useEffect(() => {
    if (autoFetch) {
      void fetchData();
    }
  }, [autoFetch, fetchData]);

  return { data, loading, error, refetch: fetchData, reset };
};

export default useFetch;
