/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback, useEffect } from "react";
import axios from "axios";

export function useFetch(url) {
  const [loading, setLoading] = useState(true);
  const [fetchedData, setFetchedData] = useState({});
  const getData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await axios.get(url);
      setFetchedData(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }, [url]);

  useEffect(() => {
    getData();
    return () => new AbortController();
  }, [url]);

  return { loading, fetchedData };
}
