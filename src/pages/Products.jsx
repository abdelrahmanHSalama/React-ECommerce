import { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";
import ProductCard from "../components/ProductCard";

const Products = () => {
    const { products, isLoading, error } = useContext(ProductsContext);

    return (
        <main className="p-2 mt-5 flex flex-wrap justify-between gap-y-2">
            {products.map((product) => (
                <ProductCard product={product} key={product.id} />
            ))}
        </main>
    );
};

export default Products;
