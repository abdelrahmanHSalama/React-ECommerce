import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    generateToken,
    verifyToken,
    hashPassword,
    comparePasswords,
} from "../utils/auth";

const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
};

// 🔹 Register User (No token yet)
export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const hashedPassword = await hashPassword(password);

            // ⚠️ Save in DB in real apps! (LocalStorage for now)
            localStorage.setItem(
                "userData",
                JSON.stringify({ email, hashedPassword })
            );

            return { email }; // No token at this step
        } catch (error) {
            return rejectWithValue("Registration failed.");
        }
    }
);

// 🔹 Login User (Verify password & get token)
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const storedUser = JSON.parse(localStorage.getItem("userData"));

            if (!storedUser) {
                return rejectWithValue("User not found. Please register!");
            }

            // ✅ Verify password
            const isPasswordCorrect = await comparePasswords(
                password,
                storedUser.hashedPassword
            );
            if (!isPasswordCorrect) {
                return rejectWithValue("Invalid Credentials!");
            }

            // ✅ Generate & verify JWT
            const token = await generateToken({ email });
            const verifiedUser = await verifyToken(token);
            if (!verifiedUser) {
                return rejectWithValue("Invalid Token!");
            }

            // ✅ Save user & token in localStorage (temporary)
            localStorage.setItem("user", JSON.stringify({ email }));
            localStorage.setItem("token", token);
            console.log(`✅ Login Successful: ${email}`); // 🔹 Added confirmation log

            return { email, token };
        } catch (error) {
            return rejectWithValue("Login failed.");
        }
    }
);

// 🔹 Logout User (Clear token & user)
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.fulfilled, (state, action) => {
                console.log("User registered:", action.payload.email);
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = { email: action.payload.email };
                state.token = action.payload.token;
            })
            .addCase(loginUser.rejected, (state, action) => {
                console.error(action.payload);
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.token = null;
            });
    },
});

export default authSlice.reducer;
