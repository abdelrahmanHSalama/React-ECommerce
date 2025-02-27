import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./slices/productsSlice";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import Account from "./pages/Account";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductDetails from "./pages/ProductDetails";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import Favourites from "./pages/Favourites";
import "./App.css";

function AppContent({ children }) {
    const dispatch = useDispatch();

    const { theme, lang } = useSelector((state) => state.ui);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    useEffect(() => {
        document.documentElement.dir = lang === "en" ? "ltr" : "rtl";
    }, [lang]);

    return children;
}

export default function App() {
    return (
        <Provider store={store}>
            <AppContent>
                <BrowserRouter>
                    <Header />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/account" element={<Account />} />
                        <Route
                            path="/products/:id"
                            element={<ProductDetails />}
                        />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/favourites" element={<Favourites />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                    <Footer />
                </BrowserRouter>
            </AppContent>
        </Provider>
    );
}
