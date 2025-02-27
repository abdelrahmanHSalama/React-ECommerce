import { createSlice } from "@reduxjs/toolkit";

const loadFavouritesFromStorage = () => {
    const storedFavourites = localStorage.getItem("favourites");
    return storedFavourites
        ? JSON.parse(storedFavourites)
        : { favouriteItems: [] };
};

const saveFavouritesToStorage = (favouritesState) => {
    localStorage.setItem("favourites", JSON.stringify(favouritesState));
};

const favouritesSlice = createSlice({
    name: "favourites",
    initialState: loadFavouritesFromStorage(),
    reducers: {
        addToFavourites: (state, action) => {
            const productExists = state.favouriteItems.some(
                (item) => item.id === action.payload.id
            );
            if (!productExists) {
                state.favouriteItems.push(action.payload);
                saveFavouritesToStorage(state);
            }
        },

        removeFromFavourites: (state, action) => {
            state.favouriteItems = state.favouriteItems.filter(
                (item) => item.id !== action.payload
            );
            saveFavouritesToStorage(state);
        },
    },
});

export const { addToFavourites, removeFromFavourites } =
    favouritesSlice.actions;
export default favouritesSlice.reducer;
