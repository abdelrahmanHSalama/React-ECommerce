import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth, db } from "../firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    onAuthStateChanged,
    getIdToken,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { clearCart } from "./cartSlice";
import { clearFavourites } from "./favouritesSlice";

const initialState = {
    user: null,
    token: null,
    loading: false,
    error: null,
};

// 🔹 Register User
export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async ({ email, password, name }, { rejectWithValue }) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;

            await updateProfile(user, { displayName: name });

            // Store user in Firestore
            const userRef = doc(db, "users", user.uid);
            await setDoc(userRef, {
                uid: user.uid,
                email: user.email,
                name: name,
                createdAt: new Date(),
            });

            return { email: user.email, name };
        } catch (error) {
            if (error.code === "auth/email-in-use") {
                return rejectWithValue("This email is already registered!");
            }
            return rejectWithValue(error.message);
        }
    }
);

// 🔹 Login User
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;

            // Retrieve user data from Firestore
            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);
            if (!userSnap.exists()) {
                return rejectWithValue("User Data not Found!");
            }
            const userData = userSnap.data();

            let token;
            try {
                token = await getIdToken(user); // Secure token retrieval
            } catch {
                return rejectWithValue(
                    "Failed to retrieve authentication token."
                );
            }

            return { email: user.email, name: userData.name, token };
        } catch (error) {
            if (error.code === "auth/invalid-credential") {
                return rejectWithValue("Wrong Email/Password!");
            }
            console.log(error);
            return rejectWithValue(error.message);
        }
    }
);

// 🔹 Logout User
export const logoutUser = createAsyncThunk(
    "auth/logoutUser",
    async (_, { dispatch }) => {
        await signOut(auth);
        dispatch(clearCart()); // Clears cart in cartSlice
        dispatch(clearFavourites()); // Clears favourites in favouritesSlice
    }
);
// 🔹 Listen for Auth Changes
export const listenForAuthChanges = createAsyncThunk(
    "auth/listenForAuthChanges",
    async (_, { dispatch }) => {
        return new Promise((resolve) => {
            const unsubscribe = onAuthStateChanged(auth, async (user) => {
                if (user) {
                    let token;
                    try {
                        token = await getIdToken(user, true);

                        const userRef = doc(db, "users", user.uid);
                        const userSnap = await getDoc(userRef);

                        if (userSnap.exists()) {
                            const userData = userSnap.data();
                            dispatch(
                                setUser({
                                    email: user.email,
                                    name: userData.name,
                                    token,
                                })
                            );
                        } else {
                            dispatch(setUser(null));
                        }
                    } catch {
                        dispatch(setUser(null));
                    }
                } else {
                    dispatch(setUser(null));
                }
                resolve(); // Resolve the promise after initial auth state is set
            });
            // Return unsubscribe function for cleanup
            return unsubscribe;
        });
    }
);
// 🔹 Redux Slice
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            if (action.payload) {
                state.user = {
                    email: action.payload.email,
                    name: action.payload.name,
                };
                state.token = action.payload.token;
            } else {
                state.user = null;
                state.token = null;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.token = action.payload.token;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.token = null;
            });
    },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
