/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback } from "react";
import axios from "axios";
import { alert } from "../utilities/alert";

export function useFetch() {
  const [loading, setLoading] = useState(false); // Initialize loading as false
  const [fetchedData, setFetchedData] = useState({});

  const fetchData = useCallback(async (url) => {
    setLoading(true); // Set loading to true when the request begins
    try {
      const response = await axios.get(url); // Await the axios request
      // Assuming that the response data is available as response.data
      setFetchedData(response.data);
      setLoading(false); // Set loading to false when the request is successful
    } catch (error) {
      setLoading(false); // Set loading to false in case of an error
      alert("Search query not found!", "error");
      console.log(error);
    }
  }, []);

  return { loading, fetchedData, fetchData };
}
