import axios from "axios";
import {  createContext, useContext, useEffect, useState } from "react";

const AdminPassContext = createContext()

export const PassProvider = ({children}) =>{

    const [passes, setPasses]= useState([])

    const fetchPasses= async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_URL}/api/admin/get-passes`);
          setPasses(response?.data);
        } catch (error) {
          console.error("Error fetching dates:", error);
        }
      };
    
      useEffect(() => {
        fetchPasses();
      }, []);

      return (
        <AdminPassContext.Provider value={{passes, fetchPasses}}>
            {children}
        </AdminPassContext.Provider>
      )
}

export const useAdminPass = () => useContext(AdminPassContext)