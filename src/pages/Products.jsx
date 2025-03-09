import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import LoadingSpinner from "../components/LoadingSpinner";

const Products = () => {
    const { products, status, error } = useSelector((state) => state.products);

    if (status === "loading") {
        return <LoadingSpinner />;
    }

    if (status === "failed") {
        return <div className="text-center">Error: {error}</div>;
    }

    return (
        <main className="p-2 mt-5 flex flex-wrap justify-between gap-y-2">
            {products.map((product) => (
                <ProductCard product={product} key={product.id} />
            ))}
        </main>
    );
};

export default Products;
