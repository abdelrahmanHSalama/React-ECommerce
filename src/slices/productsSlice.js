import { createSlice } from "@reduxjs/toolkit";
import productsData from "../db.json";

const productSlice = createSlice({
    name: "products",
    initialState: {
        products: productsData.products,
        status: "succeeded",
        error: null,
    },
    reducers: {},
});

export default productSlice.reducer;
