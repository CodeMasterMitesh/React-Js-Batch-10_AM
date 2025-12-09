import React from "react";
import Nav from "./components/nav";
import { Footer } from "./components/Footer";
import { Outlet } from "react-router-dom";

export const AppLayout = () => {
    return (
        <>
            <Nav />
            <Outlet />
            <Footer />
        </>
    );
}