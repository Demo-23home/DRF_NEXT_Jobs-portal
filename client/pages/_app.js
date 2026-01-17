import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";

import { useEffect } from "react";
import { AuthProvider } from "../context/AuthContext";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
