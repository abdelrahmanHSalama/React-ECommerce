import { useSelector, useDispatch } from "react-redux";
import {
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
} from "../slices/cartSlice";

const Cart = () => {
    const dispatch = useDispatch();
    const { cartItems, totalQuantity, totalPrice } = useSelector(
        (state) => state.cart
    );

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">🛒 Shopping Cart</h2>

            {cartItems.length === 0 ? (
                <p className="text-gray-500">Your cart is empty.</p>
            ) : (
                <div>
                    {cartItems.map((item) => (
                        <div
                            key={item.id}
                            className="flex justify-between items-center border-b py-3"
                        >
                            <div className="flex items-center gap-4">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-16 h-16 object-cover rounded"
                                />
                                <div>
                                    <h3 className="font-medium">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600">
                                        {item.price} EGP
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() =>
                                        dispatch(decreaseQuantity(item.id))
                                    }
                                    className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 transition"
                                >
                                    –
                                </button>
                                <span>{item.quantity}</span>
                                <button
                                    onClick={() =>
                                        dispatch(increaseQuantity(item.id))
                                    }
                                    className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 transition"
                                >
                                    +
                                </button>
                                <button
                                    onClick={() =>
                                        dispatch(removeFromCart(item.id))
                                    }
                                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}

                    <div className="mt-6 p-4 bg-gray-100 rounded">
                        <p>
                            <strong>Total Items:</strong> {totalQuantity}
                        </p>
                        <p>
                            <strong>Total Price:</strong>{" "}
                            {totalPrice.toFixed(2)} EGP
                        </p>
                        <button
                            onClick={() => dispatch(clearCart())}
                            className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                        >
                            Clear Cart
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
