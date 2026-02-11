import { useState, createContext, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [applied, setApplied] = useState(false);
  const [updated, setUpdated] = useState(null);

  const router = useRouter();

  const applyToJob = async (id) => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.post(`/api/jobs/apply/${id}`);

      if (res.data?.applied) {
        setApplied(true);
      }
    } catch (err) {
      setError(err?.response?.data?.message || "You must login first.");
    } finally {
      setLoading(false);
    }
  };

  //? Clear Errors
  const clearErrors = () => {
    setError(null);
  };

  return (
    <JobContext.Provider
      value={{
        loading,
        error,
        updated,
        applied,
        applyToJob,
        setUpdated,
        clearErrors,
        setError,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export default JobContext;
