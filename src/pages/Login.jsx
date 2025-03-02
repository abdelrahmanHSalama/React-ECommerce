import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const result = await dispatch(loginUser({ email, password }));

        if (result.meta.requestStatus === "fulfilled") {
            navigate("/");
        } else {
            alert("Login failed. Please check your credentials.");
        }
    };

    return (
        <main className="flex justify-center p-4">
            <div className="w-full sm:w-1/2 md:w-1/3 bg-white shadow-md rounded-lg p-6">
                <h1 className="mb-4 text-center text-xl font-semibold">
                    Login
                </h1>

                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block font-medium">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border p-2 rounded"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block font-medium">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border p-2 rounded"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                        Login
                    </button>
                </form>
            </div>
        </main>
    );
};

export default Login;
