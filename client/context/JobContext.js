import { useState, createContext, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [applied, setApplied] = useState(false);
  const [updated, setUpdated] = useState(null);
  const [stats, setStats] = useState(null);

  const router = useRouter();

  // Apply to a job
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

  // check job applied
  const checkJobApplied = async (id, access_token) => {
    try {
      setLoading(true);

      const res = await axios.get(`/api/jobs/applied/${id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      if (res.data === true) {
        setApplied(true);
      }

      return res;
    } catch (err) {
      setError(
        err?.response?.data?.error || "An error occurred > checked jobs",
      );
      return { data: false }; // optional fallback
    } finally {
      setLoading(false);
    }
  };

  //? Get topic stats
  const getTopicStats = async (topic) => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/jobs/stats/${topic}/`);
      setLoading(false);
      setStats(res.data);
    } catch (err) {
      setLoading(false);
      setError(err?.response?.data?.error || "An error occurred > stats");
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
        stats,
        getTopicStats,
        checkJobApplied,
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
