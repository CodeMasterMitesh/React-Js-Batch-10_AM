import Nav from "../components/nav";
import HeroBanner from "../components/HeroBanner";
import { ProductGallery } from "../components/ProductGallery";
import { ContextProvider } from "../components/hooks/ContextApi.jsx";
export const Home = () => {
    return (
        <div>
            <ContextProvider>
                <HeroBanner />
                <ProductGallery />
            </ContextProvider>
        </div>
    );
};