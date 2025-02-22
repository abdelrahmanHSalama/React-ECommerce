import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import Account from "./pages/Account";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ThemeProvider } from "./context/ThemeContext";
import { LangProvider } from "./context/LangContext";
import { ProductsProvider } from "./context/ProductsContext";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
    return (
        <ThemeProvider>
            <LangProvider>
                <QueryClientProvider client={queryClient}>
                    <ProductsProvider>
                        <BrowserRouter>
                            <Header />
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route
                                    path="/products"
                                    element={<Products />}
                                />
                                <Route path="/contact" element={<Contact />} />
                                <Route path="/account" element={<Account />} />
                            </Routes>
                            <Footer />
                        </BrowserRouter>
                    </ProductsProvider>
                </QueryClientProvider>
            </LangProvider>
        </ThemeProvider>
    );
}
