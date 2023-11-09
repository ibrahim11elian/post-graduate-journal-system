import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useFetch } from "../hooks/usefetch";
import Header from "../components/header";
import SearchForm from "../components/search_form";
import Table from "../components/search_result_table";

const baseApiUrl = process.env.REACT_APP_API_URL;

function Search() {
  const { loading, fetchedData, fetchData } = useFetch();
  const [searchQuery, setResearchQuery] = useState("");
  const [route, setRoute] = useState("");

  const handleSearch = (params) => {
    fetchData(`${baseApiUrl}${params}`);
  };

  const location = useLocation();
  useEffect(() => {
    // Check if searchQuery and fetchedData exist in the location state
    const data = location.state;
    if (data && data.searchQuery && data.route) {
      // Set the searchQuery and fetchedData in your component's state
      setResearchQuery(JSON.parse(data.searchQuery));
      setRoute(JSON.parse(data.route));
      handleSearch(
        `/${JSON.parse(data.route)}/${JSON.parse(data.searchQuery)}`
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <>
      <Header />
      <SearchForm
        loading={loading}
        handleSearch={handleSearch}
        searchQuery={searchQuery}
        setResearchQuery={setResearchQuery}
        route={route}
        setRoute={setRoute}
      />
      <Table
        fetchedData={fetchedData}
        searchQuery={searchQuery}
        route={route}
      />
    </>
  );
}

export default Search;
