import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create the context
const DatesContext = createContext();

// Context provider component
export const DatesProvider = ({ children }) => {
  const [submittedDates, setSubmittedDates] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDates = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/api/dates`
      );
      setSubmittedDates(response?.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching dates:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDates();
  }, []);

  return (
    <DatesContext.Provider value={{ submittedDates, fetchDates, loading }}>
      {children}
    </DatesContext.Provider>
  );
};

// Custom hook to use the context
export const useDates = () => useContext(DatesContext);
