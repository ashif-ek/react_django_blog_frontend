import { useState } from "react";

export function useFetch(asyncFn) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const run = async (...args) => {
    setLoading(true);
    setError("");
    try {
      const result = await asyncFn(...args);
      setData(result);
      return result;
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { data, run, loading, error };
}
