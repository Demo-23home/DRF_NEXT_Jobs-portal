import { useState, useEffect, createContext, Children, use } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        loading,
        user,
        isAuthenticated,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
