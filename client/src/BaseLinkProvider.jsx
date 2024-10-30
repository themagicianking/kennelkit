import { createContext, useContext } from "react";

const BaseLinkContext = createContext();

export const useBaseLink = () => {
  return useContext(BaseLinkContext);
};

export const BaseLinkProvider = ({ children }) => {
  const baseURL = import.meta.env.VITE_API_URL;

  return (
    <BaseLinkContext.Provider value={baseURL}>
      {children}
    </BaseLinkContext.Provider>
  );
};
