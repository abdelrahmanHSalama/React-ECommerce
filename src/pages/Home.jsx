import { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";
import ProductCard from "../components/ProductCard";
import productBanner from "../assets/productBanner.png";

const Home = () => {
    const { products, isLoading, error } = useContext(ProductsContext);

    if (isLoading) {
        return <div>Loading...</div>; // Show a loading message
    }

    if (error) {
        return <div>Error fetching products: {error.message}</div>; // Show an error message
    }

    return (
        <main className="p-2">
            <img
                className="w-full object-cover"
                src={productBanner}
                alt="Product Banner"
            />

            <div className="mt-5 flex flex-wrap gap-2">
                {products.slice(0, 5).map((product) => (
                    <ProductCard product={product} key={product.id} />
                ))}
            </div>
        </main>
    );
};

export default Home;
