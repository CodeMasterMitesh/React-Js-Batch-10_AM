import React from "react";
import HeroBanner from "../components/HeroBanner";
import ProductCategory from "../components/ProductCategory";
import DealOfDay from "../components/DealOfDay";
import ProductOnSale from "../components/ProductOnSale";
import { ContextProvider } from "../components/hooks/ContextApi.jsx";

export const Home = () => {
    return (
        <div>
            <ContextProvider>
                <HeroBanner />
                <ProductCategory />
                <DealOfDay />
                <ProductOnSale />
            </ContextProvider>
        </div>
    );
};