import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create the context
const DatesContext = createContext();

// Context provider component
export const DatesProvider = ({ children }) => {
  const [submittedDates, setSubmittedDates] = useState([]);

  const fetchDates = async () => {
    try {
      const response = await axios.get("http://192.168.29.219:5000/api/dates");
      setSubmittedDates(response?.data);
    } catch (error) {
      console.error("Error fetching dates:", error);
    }
  };

  useEffect(() => {
    fetchDates();
  }, []);

  return (
    <DatesContext.Provider value={{ submittedDates, fetchDates }}>
      {children}
    </DatesContext.Provider>
  );
};

// Custom hook to use the context
export const useDates = () => useContext(DatesContext);
