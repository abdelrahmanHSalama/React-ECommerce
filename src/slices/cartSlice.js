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
            const itemAlreadyInCart = state.cartItems.find(
                (item) => item.id === action.payload.id
            );

            if (!itemAlreadyInCart) {
                state.cartItems.push({ ...action.payload, quantity: 1 });
                state.totalQuantity++;
                state.totalPrice += action.payload.price;
            }

            saveCartToStorage(state);
        },

        removeFromCart: (state, action) => {
            const itemIndex = state.cartItems.findIndex(
                (item) => item.id === action.payload
            );

            if (itemIndex !== -1) {
                const item = state.cartItems[itemIndex];
                state.cartItems.splice(itemIndex, 1);
                state.totalQuantity -= item.quantity;
                state.totalPrice -= item.quantity * item.price;
            }

            saveCartToStorage(state);
        },

        increaseQuantity: (state, action) => {
            const item = state.cartItems.find(
                (item) => item.id === action.payload
            );
            if (item) {
                item.quantity++;
                state.totalQuantity++;
                state.totalPrice += item.price;
            }

            saveCartToStorage(state);
        },

        decreaseQuantity: (state, action) => {
            const item = state.cartItems.find(
                (item) => item.id === action.payload
            );
            if (item && item.quantity > 1) {
                item.quantity--;
                state.totalQuantity--;
                state.totalPrice -= item.price;
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

export const {
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
