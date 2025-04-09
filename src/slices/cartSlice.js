import { createSlice } from "@reduxjs/toolkit";

const initialCartState = { cartItems: [], totalQuantity: 0, totalPrice: 0 };

const loadCartFromStorage = () => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : initialCartState;
};

const saveCartToStorage = (cartState) => {
    localStorage.setItem("cart", JSON.stringify(cartState));
};

const cartSlice = createSlice({
    name: "cart",
    initialState: loadCartFromStorage(),
    reducers: {
        addToCart: (state, action) => {
            console.log("🛒 addToCart called with:", action.payload);

            const itemAlreadyInCart = state.cartItems.find(
                (item) => item.id === action.payload.id
            );

            console.log("🔍 Item already in cart:", itemAlreadyInCart);

            if (!itemAlreadyInCart) {
                // Make sure quantity is set (default to 1 if not provided)
                const itemToAdd = {
                    ...action.payload,
                    quantity: action.payload.quantity || 1,
                };
                console.log("📦 Adding new item:", itemToAdd);

                state.cartItems.push(itemToAdd);
                state.totalQuantity += itemToAdd.quantity;
                state.totalPrice += itemToAdd.price * itemToAdd.quantity;

                console.log("🧮 New totalQuantity:", state.totalQuantity);
                console.log("💰 New totalPrice:", state.totalPrice);
            } else {
                // Update existing item quantity
                itemAlreadyInCart.quantity += action.payload.quantity || 1;
                state.totalQuantity += action.payload.quantity || 1;
                state.totalPrice +=
                    itemAlreadyInCart.price * (action.payload.quantity || 1);

                console.log(
                    "🔄 Updated item quantity:",
                    itemAlreadyInCart.quantity
                );
                console.log("🧮 New totalQuantity:", state.totalQuantity);
                console.log("💰 New totalPrice:", state.totalPrice);
            }

            console.log("🗂️ Saving cart to localStorage:", state);
            saveCartToStorage(state);
        },

        removeFromCart: (state, action) => {
            const itemIndex = state.cartItems.findIndex(
                (item) => item.id === action.payload
            );

            if (itemIndex !== -1) {
                const item = state.cartItems[itemIndex];
                state.totalQuantity -= item.quantity;
                state.totalPrice -= item.price * item.quantity;
                state.cartItems.splice(itemIndex, 1);
            }

            saveCartToStorage(state);
        },

        clearCart: (state) => {
            state.cartItems = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;

            saveCartToStorage(state);
        },
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
