import React from "react";
import Nav from "./components/nav";
import { Footer } from "./components/Footer";
import { Outlet } from "react-router-dom";
import { GlobalModals } from "./components/GlobalModals";

export const AppLayout = () => {
  return (
    <>
      <Nav />
      <main>
        <Outlet />
      </main>
      <GlobalModals />
      <Footer />
    </>
  );
};
