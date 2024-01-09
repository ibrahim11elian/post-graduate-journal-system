import { useContext } from "react";
import { ResearchContext } from "../context/ResearchContext";

export const useResearchContext = () => {
  const context = useContext(ResearchContext);
  if (!context) {
    throw new Error(
      "useResearchContext must be used within a ResearchContextProvider"
    );
  }
  return context;
};
