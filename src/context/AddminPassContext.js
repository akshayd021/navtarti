import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AdminPassContext = createContext();

export const PassProvider = ({ children }) => {
  const [passes, setPasses] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPasses = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/api/admin/get-passes`
      );
      setPasses(response?.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching dates:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPasses();
  }, []);

  return (
    <AdminPassContext.Provider value={{ passes, fetchPasses, loading }}>
      {children}
    </AdminPassContext.Provider>
  );
};

export const useAdminPass = () => useContext(AdminPassContext);
