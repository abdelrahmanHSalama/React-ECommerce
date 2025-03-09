import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleErrors = () => {
        const errorsObj = {};

        if (!name.trim()) {
            errorsObj.name = "Please enter your name!";
        }
        if (!email.trim()) {
            errorsObj.email = "Please enter your email!";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errorsObj.email = "Please enter a valid email!";
        }
        if (password.length < 6) {
            errorsObj.password =
                "Please enter a password of at least 6 characters!";
        }
        if (password !== confirmPassword) {
            errorsObj.confirmPassword = "Passwords do not match!"; // ✅ Validation
        }

        setErrors(errorsObj);

        return Object.keys(errorsObj).length;
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (handleErrors()) {
            return;
        }

        const result = await dispatch(registerUser({ name, email, password }));

        if (result.meta.requestStatus === "fulfilled") {
            navigate("/");
        } else {
            switch (result.payload) {
                case "Firebase: Error (auth/email-already-in-use).":
                    setErrors({
                        ...errors,
                        general: "Email Already Registered!",
                    });
                    break;
                default:
                    setErrors({
                        general: result.payload || "Registration failed.",
                    });
            }
        }
    };

    return (
        <main className="flex justify-center p-4">
            <div className="w-full sm:w-1/2 md:w-1/3 bg-white shadow-md rounded-lg p-6">
                <h1 className="mb-4 text-center text-xl font-semibold">
                    Register
                </h1>

                <form onSubmit={handleRegister}>
                    {/* Name Field */}
                    <div className="mb-4">
                        <label className="block font-medium">Full Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border p-2 rounded"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    {/* Email Field */}
                    <div className="mb-4">
                        <label className="block font-medium">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border p-2 rounded"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className="mb-4">
                        <label className="block font-medium">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border p-2 rounded"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    {/* Confirm Password Field */}
                    <div className="mb-4">
                        <label className="block font-medium">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full border p-2 rounded"
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm">
                                {errors.confirmPassword}
                            </p>
                        )}
                    </div>

                    {/* General Error Message */}
                    {errors.general && (
                        <p className="text-red-500 text-sm text-center mb-4">
                            {errors.general}
                        </p>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                        Register
                    </button>

                    <div className="text-center text-gray-500 flex justify-center mt-1">
                        <p>Already Have an Account?&nbsp;</p>
                        <Link to="/login" className="text-blue-500 underline">
                            Login
                        </Link>
                        <p>.</p>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default Register;
