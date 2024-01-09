import { useState, useCallback } from "react";
import axios from "axios";
import { alert } from "../utilities/alert";

// Custom hook for making HTTP GET requests
export function useFetch() {
  // State to track loading status
  const [loading, setLoading] = useState(false);

  // State to store fetched data
  const [fetchedData, setFetchedData] = useState({});

  // Function to fetch data from a specified URL
  const fetchData = useCallback(async (url) => {
    // Set loading to true before making the request
    setLoading(true);

    try {
      // Make a GET request to the specified URL
      const response = await axios.get(url);

      // Extract the data from the response
      const newData = response.data;

      // Set the fetched data and update loading status
      setFetchedData(newData);
      setLoading(false);
    } catch (error) {
      // Handle errors by updating loading status and showing an alert
      setLoading(false);
      alert("Search query not found!", "error");
      console.log(error);
    }
  }, []);

  // Return loading status, fetched data, and the fetchData function
  return { loading, fetchedData, fetchData };
}
