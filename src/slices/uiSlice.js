import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: "uiSlice",
    initialState: { theme: "light", lang: "en" },
    reducers: {
        toggleTheme: (state) => {
            state.theme = state.theme === "light" ? "dark" : "light";
        },
        toggleLang: (state) => {
            state.lang = state.lang === "en" ? "ar" : "en";
        },
    },
});

export const { toggleTheme, toggleLang } = uiSlice.actions;
export default uiSlice.reducer;
