import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme, toggleLang } from "../slices/uiSlice";

const Header = function () {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dispatch = useDispatch();
    const cartCount = useSelector((state) => state.cart.cartItems.length);
    const favouritesCount = useSelector(
        (state) => state.favourites.favouriteItems.length
    );
    const { theme, lang } = useSelector((state) => state.ui);

    return (
        <header className="flex items-center bg-gray-200 px-5 py-4 relative">
            <Link to="/">
                <img src="/Nile.png" className="w-24" alt="Logo" />
            </Link>

            <nav className="hidden sm:flex ml-4 gap-2">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `px-4 py-2 rounded-md font-medium transition block ${
                            isActive
                                ? "bg-blue-500 text-white"
                                : "bg-gray-300 text-gray-800 hover:bg-gray-400 dark:bg-gray-700 dark:text-white"
                        }`
                    }
                >
                    Home
                </NavLink>
                <NavLink
                    to="/products"
                    className={({ isActive }) =>
                        `px-4 py-2 rounded-md font-medium transition block ${
                            isActive
                                ? "bg-blue-500 text-white"
                                : "bg-gray-300 text-gray-800 hover:bg-gray-400 dark:bg-gray-700 dark:text-white"
                        }`
                    }
                >
                    Products
                </NavLink>
                <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                        `px-4 py-2 rounded-md font-medium transition block ${
                            isActive
                                ? "bg-blue-500 text-white"
                                : "bg-gray-300 text-gray-800 hover:bg-gray-400 dark:bg-gray-700 dark:text-white"
                        }`
                    }
                >
                    Contact
                </NavLink>
                <NavLink
                    to="/account"
                    className={({ isActive }) =>
                        `px-4 py-2 rounded-md font-medium transition block ${
                            isActive
                                ? "bg-blue-500 text-white"
                                : "bg-gray-300 text-gray-800 hover:bg-gray-400 dark:bg-gray-700 dark:text-white"
                        }`
                    }
                >
                    Account
                </NavLink>
                <NavLink
                    to="/cart"
                    className={({ isActive }) =>
                        `px-4 py-2 rounded-md font-medium transition block ${
                            isActive
                                ? "bg-blue-500 text-white"
                                : "bg-gray-300 text-gray-800 hover:bg-gray-400 dark:bg-gray-700 dark:text-white"
                        }`
                    }
                >
                    {cartCount === 0 ? "Cart" : `Cart (${cartCount})`}
                </NavLink>
                <NavLink
                    to="/favourites"
                    className={({ isActive }) =>
                        `px-4 py-2 rounded-md font-medium transition block ${
                            isActive
                                ? "bg-blue-500 text-white"
                                : "bg-gray-300 text-gray-800 hover:bg-gray-400 dark:bg-gray-700 dark:text-white"
                        }`
                    }
                >
                    {favouritesCount === 0
                        ? "Favourites"
                        : `Favourites (${favouritesCount})`}
                </NavLink>
            </nav>

            <button
                className="sm:hidden ml-auto p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                {isMenuOpen ? "❌" : "☰"}
            </button>

            {isMenuOpen && (
                <nav className="absolute top-full left-0 w-full bg-white shadow-md p-4 flex flex-col gap-2 sm:hidden">
                    <NavLink
                        to="/"
                        className="px-4 py-2 rounded-md font-medium transition block bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:text-white"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/products"
                        className="px-4 py-2 rounded-md font-medium transition block bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:text-white"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Products
                    </NavLink>
                    <NavLink
                        to="/contact"
                        className="px-4 py-2 rounded-md font-medium transition block bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:text-white"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Contact
                    </NavLink>
                    <NavLink
                        to="/account"
                        className="px-4 py-2 rounded-md font-medium transition block bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:text-white"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Account
                    </NavLink>
                </nav>
            )}

            <div className="ml-auto sm:flex gap-2 hidden">
                <button
                    className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition"
                    onClick={() => dispatch(toggleTheme())}
                >
                    {theme === "light" ? "🌑 Dark Mode" : "☀️ Light Mode"}
                </button>
                <button
                    className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
                    onClick={() => dispatch(toggleLang())}
                >
                    {lang === "en" ? "العربية" : "English"}
                </button>
            </div>

            {isMenuOpen && (
                <div className="absolute bottom-[-90px] left-0 w-full bg-white shadow-md p-4 flex flex-col gap-2 sm:hidden">
                    <button
                        className="w-full px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition"
                        onClick={() => dispatch(toggleTheme())}
                    >
                        {theme === "light" ? "🌑 Dark Mode" : "☀️ Light Mode"}
                    </button>
                    <button
                        className="w-full px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
                        onClick={() => dispatch(toggleLang())}
                    >
                        {lang === "en" ? "العربية" : "English"}
                    </button>
                </div>
            )}
        </header>
    );
};

export default Header;
