import axios from "axios";
import { createContext } from "react";
import { useQuery } from "@tanstack/react-query";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
    const {
        data: products,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const response = await axios.get("http://localhost:3000/products");
            return response.data;
        },
    });

    return (
        <ProductsContext.Provider
            value={{ products, loading: isLoading, error }}
        >
            {children}
        </ProductsContext.Provider>
    );
};
