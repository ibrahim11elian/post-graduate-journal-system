import { useState, useCallback, useEffect } from "react";
let getData;
export function useFetch(url) {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  getData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }, [url]);

  useEffect(() => {
    getData();
  }, [url]);

  return { loading, products, setProducts };
}

export const refresh = () => {
  getData();
};
