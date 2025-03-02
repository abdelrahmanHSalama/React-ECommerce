import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { logoutUser } from "../slices/authSlice";

const Header = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        dispatch(logoutUser());
        setMenuOpen(false);
    };

    const isActive = (path) => (location.pathname === path ? "underline" : "");

    return (
        <header className="flex justify-between items-center p-4 bg-gray-800 text-white relative">
            <Link to="/" onClick={() => setMenuOpen(false)}>
                <img src="/nile.png" className="w-24" alt="Logo" />
            </Link>

            <button
                className="md:hidden text-2xl"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                {menuOpen ? "✖️" : "☰"}
            </button>

            <nav
                className={`absolute md:static top-16 left-0 w-full md:w-auto bg-gray-800 md:bg-transparent md:flex md:items-center p-4 md:p-0 transition-all ${
                    menuOpen ? "block" : "hidden"
                }`}
            >
                <ul className="flex flex-col md:flex-row gap-4">
                    <li>
                        <Link
                            to="/"
                            className="flex items-center gap-1"
                            onClick={() => setMenuOpen(false)}
                        >
                            <span>🏠</span>
                            <span
                                className={`hover:underline ${isActive("/")}`}
                            >
                                Home
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/products"
                            className="flex items-center gap-1"
                            onClick={() => setMenuOpen(false)}
                        >
                            <span>🛍️</span>
                            <span
                                className={`hover:underline ${isActive(
                                    "/products"
                                )}`}
                            >
                                Products
                            </span>
                        </Link>
                    </li>
                    {user ? (
                        <>
                            <li>
                                <Link
                                    to="/cart"
                                    className="flex items-center gap-1"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    <span>🛒</span>
                                    <span
                                        className={`hover:underline ${isActive(
                                            "/cart"
                                        )}`}
                                    >
                                        Cart
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/favourites"
                                    className="flex items-center gap-1"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    <span>❤️</span>
                                    <span
                                        className={`hover:underline ${isActive(
                                            "/favourites"
                                        )}`}
                                    >
                                        Favourites
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-1"
                                >
                                    <span>🚪</span>
                                    <span className="hover:underline">
                                        Logout
                                    </span>
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link
                                    to="/register"
                                    className="flex items-center gap-1"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    <span>📝</span>
                                    <span
                                        className={`hover:underline ${isActive(
                                            "/register"
                                        )}`}
                                    >
                                        Register
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/login"
                                    className="flex items-center gap-1"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    <span>🔑</span>
                                    <span
                                        className={`hover:underline ${isActive(
                                            "/login"
                                        )}`}
                                    >
                                        Login
                                    </span>
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
