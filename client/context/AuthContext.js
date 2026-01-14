import { useState, createContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const router = useRouter();

  const login = async ({ username, password }) => {
    setError(null);
    setLoading(true);

    if (!username || !password) {
      setError("Username and password are required");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post("/api/auth/login", {
        username,
        password,
      });

      // If token returned → login success
      if (res.data.access) {
        setIsAuthenticated(true);
        setLoading(false);
        router.push("/");
      } else {
        setLoading(false);
        setError("Invalid Credentials");
      }

    } catch (err) {
      setLoading(false);
      const message =
        err.response?.data?.error ||
        err.response?.data?.detail ||
        "Login failed";

      setError(message);

      console.log("LOGIN ERROR:", err.response?.data);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        isAuthenticated,
        error,
        user,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
