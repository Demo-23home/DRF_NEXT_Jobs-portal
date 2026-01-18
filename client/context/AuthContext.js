import { useState, createContext, useEffect, useActionState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [updated, setUpdated] = useState(null);
  const [uploaded, setUploaded] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const publicPaths = ["/login", "/register"];
    if (!user && !publicPaths.includes(router.pathname)) {
      loadUser();
    }
  }, [user, router.pathname]);

  //? Register User
  const register = async ({
    first_name,
    last_name,
    email,
    username,
    password,
  }) => {
    setError(null);
    setLoading(true);

    try {
      const res = await axios.post("/api/auth/register", {
        first_name,
        last_name,
        email,
        username,
        password,
      });

      if (res.data?.user) {
        setLoading(false);
        router.push("/login");
      } else {
        setLoading(false);
        setError("Registration succeeded but response unexpected.");
      }
    } catch (err) {
      setLoading(false);
      const message = err.response?.data?.error || "Something went wrong";
      setError(message);
    }
  };

  //? Update User's Profile
  const updateProfile = async (
    { username, email, first_name, last_name, password },
    access_token,
  ) => {
    setLoading(true);

    try {
      const res = await axios.put(
        `/api/user/update/`,
        { username, email, first_name, last_name, password },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (res.data) {
        setUser(res.data);
        setUpdated(true);
      }
    } catch (err) {
      let message = "Something went wrong";

      if (err.response?.data) {
        const data = err.response.data;

        if (typeof data === "object") {
          message = Object.values(data)
            .map((msgs) => (Array.isArray(msgs) ? msgs.join(", ") : msgs))
            .join("\n");
        } else if (typeof data === "string") {
          message = data;
        }
      }

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  //? Upload Resume
  const uploadResume = async (formData, access_token) => {
    try {
      setLoading(true);
      const res = await axios.post(
        "/api/user/upload_resume",
        { formData },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      );
      if (res.data) {
        setLoading(false);
        setUploaded(true);
      }
    } catch (err) {
      setLoading(false);
      const message = err.response?.data?.error;
      setError(message);

      console.log("LOGIN ERROR:", err.response?.data);
    }
  };
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
            error.response.data.error),
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
            error.response.data.error),
      );
    }
  };

  //? Clear Errors
  const clearErrors = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        isAuthenticated,
        error,
        user,
        register,
        updated,
        setUpdated,
        updateProfile,
        login,
        logout,
        uploadResume,
        setUploaded,
        uploaded,
        clearErrors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
