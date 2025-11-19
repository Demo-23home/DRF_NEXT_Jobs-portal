
import React from "react";
import Script from "next/script";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div>
      {/* Bootstrap CSS */}
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
        integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
        crossOrigin="anonymous"
      />

      {/* Bootstrap JS dependencies */}
      <Script
        strategy="afterInteractive"
        src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
      />
      <Script
        strategy="afterInteractive"
        src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"
      />
      <Script
        strategy="afterInteractive"
        src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.min.js"
      />
      <Script
        src="https://kit.fontawesome.com/9edb65c86a.js"
        strategy="afterInteractive"
        crossOrigin="anonymous"
      />

      {/* Layout */}
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
