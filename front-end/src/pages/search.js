import React, { useState } from "react";
import { useFetch } from "../hooks/usefetch";
import Header from "../components/header";
import SearchForm from "../components/search_form";
import Table from "../components/search_result_table";

const baseUrl = "http://localhost:3000";

function Search({ setResearch }) {
  const [route, setRoute] = useState("");
  const [params, setParams] = useState("");
  const [searchQuery, setResearchQuery] = useState("");
  const { loading, fetchedData } = useFetch(`${baseUrl}${params}`);
  return (
    <>
      <Header />
      <SearchForm
        route={route}
        searchQuery={searchQuery}
        setParams={setParams}
        setRoute={setRoute}
        setResearchQuery={setResearchQuery}
      />
      <Table fetchedData={fetchedData} setResearch={setResearch} />
    </>
  );
}

export default Search;
