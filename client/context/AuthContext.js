import { useState, createContext, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const router = useRouter();

  useEffect(() => {
    if (!user) {
      loadUser();
    }
  }, [user]);

  //? Login User
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

      //* If token returned → login success
      if (res.data.access) {
        loadUser();
        setIsAuthenticated(true);
        setLoading(false);
        router.push("/");
      } else {
        setLoading(false);
        setError("Invalid Credentials");
      }
    } catch (err) {
      setLoading(false);
      const message = err.response?.data?.error;
      setError(message);

      console.log("LOGIN ERROR:", err.response?.data);
    }
  };

  //? Load User
  const loadUser = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/auth/user");
      if (res.data.user) {
        setIsAuthenticated(true);
        setLoading(false);
        setUser(res.data.user);
      }
    } catch (error) {
      setIsAuthenticated(false);
      setLoading(false);
      setUser(null);
      setError(
        error.response &&
          (error.response.data.message ||
            error.response.data.detail ||
            error.response.data.error)
      );
    }
  };

    //? Logout User
  const logout = async () => {
    try {
      const res = await axios.post("/api/auth/logout");
      if (res.data.success) {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      setIsAuthenticated(false);
      setLoading(false);
      setUser(null);
      setError(
        error.response &&
          (error.response.data.message ||
            error.response.data.detail ||
            error.response.data.error)
      );
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
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
