import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async () => {
        const querySnapshot = await getDocs(collection(db, "products"));
        console.log(querySnapshot);
        return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    }
);

const productSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default productSlice.reducer;
