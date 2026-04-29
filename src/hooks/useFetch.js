import { useState, useEffect, useCallback } from 'react';

const useFetch = (apiFunction, params = null, immediate = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (overrideParams) => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiFunction(overrideParams || params);
        setData(response.data);
        return { success: true, data: response.data };
      } catch (err) {
        const message =
          err.response?.data?.message || 'Something went wrong';
        setError(message);
        return { success: false, error: message };
      } finally {
        setLoading(false);
      }
    },
    [apiFunction, params]
  );

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [immediate, execute]);

  const reset = () => {
    setData(null);
    setError(null);
    setLoading(false);
  };

  return { data, loading, error, execute, reset };
};

export default useFetch;
