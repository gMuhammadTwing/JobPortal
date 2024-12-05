import { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "./axiosInstance";

const DropdownContext = createContext();

export const DropdownProvider = ({ children }) => {
  const [allDropdownValues, setAllDropdownValues] = useState();
  const fetchDropDownData = async () => {
    
      // await axiosInstance.get(
      //   "api/lookup/general_api"
      // ).then((response)=>{
      //   setAllDropdownValues(response.data);
        
        
      // }).catch((error)=>{
      //   console.error("Error fetching data:", error);
      // });
   
  };
  useEffect(() => {
    fetchDropDownData();
  }, []);

  

  return (
    <DropdownContext.Provider value={allDropdownValues}>
      {children}
    </DropdownContext.Provider>
  );
};

export const useDropdownContext = () => useContext(DropdownContext);
