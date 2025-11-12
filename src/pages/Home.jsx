import Nav from "../components/nav";
import HeroBanner from "../components/HeroBanner";
import { ProductGallery } from "../components/ProductGallery";
export const Home = () => {
    return (
        <div>
            <Nav />
            <HeroBanner />
            <ProductGallery />
        </div>
    );
};