import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Cart from "../Cart";
import Head from "next/head";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>
      <Header />
      <Cart />
      <main className="min-h-screen mt-16">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
