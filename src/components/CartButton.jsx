import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart, removeFromCart } from "../slices/cartSlice";

const CartButton = ({ product }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const cartItem = useSelector((state) =>
        state.cart.cartItems.find((item) => item.id === product.id)
    );

    const handleAddToCart = () => {
        if (!user) {
            navigate("/login");
        } else {
            dispatch(addToCart(product));
        }
    };

    if (!cartItem) {
        return (
            <button
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition p-0 m-0"
                onClick={handleAddToCart}
            >
                Add to Cart
            </button>
        );
    } else {
        return (
            <div className="mt-2 flex items-center space-x-2">
                <button
                    className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition p-0 m-0"
                    onClick={() => dispatch(removeFromCart(product.id))}
                >
                    Remove
                </button>
            </div>
        );
    }
};

export default CartButton;
