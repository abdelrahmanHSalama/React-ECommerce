import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import productBanner from "../assets/productBanner.png";
import LoadingSpinner from "../components/LoadingSpinner";

const Home = () => {
    const { products, status, error } = useSelector((state) => state.products);

    if (status === "loading") {
        return <LoadingSpinner />;
    }

    if (status === "failed") {
        return <div className="text-center">Error: {error}</div>;
    }

    return (
        <main className="p-2">
            <img
                className="w-full object-cover"
                src={productBanner}
                alt="Product Banner"
            />

            <div className="mt-5 flex flex-wrap justify-around gap-y-2">
                {products.slice(0, 5).map((product) => (
                    <ProductCard product={product} key={product.id} />
                ))}
            </div>
        </main>
    );
};

export default Home;
