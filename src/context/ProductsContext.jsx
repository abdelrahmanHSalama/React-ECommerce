import axios from "axios";
import { createContext, useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
    useEffect(() => {
        axios
            .get("http://localhost:3000/products")
            .then((res) => console.log("Manual API Response:", res.data))
            .catch((err) => console.error("Manual Fetch Error:", err));
    }, []);
    const {
        data: products,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const response = await axios.get("http://localhost:3000/products");
            console.log("API Response:", response.data); // ✅ Check API response
            return response.data;
        },
    });
    console.log("Products Context:", { products, isLoading, error }); // ✅ Check state values
    return (
        <ProductsContext.Provider value={{ products, isLoading, error }}>
            {children}
        </ProductsContext.Provider>
    );
};
