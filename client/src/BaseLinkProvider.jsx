import { createContext, useContext } from "react";

const ServerNameContext = createContext();

export const useServerName = () => {
  return useContext(ServerNameContext);
};

export const ServerNameProvider = ({ children }) => {
  const baseURL = import.meta.env.VITE_API_URL;

  return (
    <ServerNameContext.Provider value={baseURL}>
      {children}
    </ServerNameContext.Provider>
  );
};
