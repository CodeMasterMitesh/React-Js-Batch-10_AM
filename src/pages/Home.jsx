import React from "react";
import HeroBanner from "../components/HeroBanner";
import ProductCategory from "../components/ProductCategory";
import DealOfDay from "../components/DealOfDay";
import ProductOnSale from "../components/ProductOnSale";
import BestSellers from "../components/BestSellers";
import FeaturedProducts from "../components/FeaturedProducts";
import VoucherPromo from "../components/VoucherPromo";
import { ContextProvider } from "../components/hooks/ContextApi.jsx";

export const Home = () => {
    return (
        <div>
            <ContextProvider>
                <HeroBanner />
                <ProductCategory />
                <DealOfDay />
                <BestSellers />
                <FeaturedProducts />
                <ProductOnSale />
                <VoucherPromo />
            </ContextProvider>
        </div>
    );
};