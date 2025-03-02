import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import ProductDetails from "./pages/ProductDetails";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import Favourites from "./pages/Favourites";
import "./App.css";

export default function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/products/:id" element={<ProductDetails />} />
                    <Route
                        path="/cart"
                        element={
                            <ProtectedRoute>
                                <Cart />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/favourites"
                        element={
                            <ProtectedRoute>
                                <Favourites />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </Provider>
    );
}
