import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productsSlice";
import cartReducer from "./slices/cartSlice";
import favouritesReducer from "./slices/favouritesSlice";
import uiReducer from "./slices/uiSlice";

export const store = configureStore({
    reducer: {
        products: productsReducer,
        cart: cartReducer,
        favourites: favouritesReducer,
        ui: uiReducer,
    },
});
