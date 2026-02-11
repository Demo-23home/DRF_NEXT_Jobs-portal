import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";

import { useEffect } from "react";
import { AuthProvider } from "../context/AuthContext";
import { JobProvider } from "../context/JobContext";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <AuthProvider>
      <JobProvider>
        <Component {...pageProps} />
      </JobProvider>
    </AuthProvider>
  );
}

export default MyApp;
