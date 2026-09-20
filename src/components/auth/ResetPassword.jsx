import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { ResetUserPassword } from "../../api/api";
import { Eye, EyeOff } from "lucide-react";

export default function ResetPassword() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        setError("");
        setSuccess("");

        if (!token) {
            setError("Invalid or missing reset link.");
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);

        try {
            await ResetUserPassword({
                token,
                password
            });

            setSuccess("Password reset successfully!");

            setTimeout(() => {
                navigate("/");
            }, 1500);

        } catch (err) {
            setError(err.message || "Password reset failed.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="shadow-md bg-white max-w-130 mx-auto mt-10 p-6 border border-gray-200 rounded-xl">

            <h2 className="font-bold text-2xl text-center text-gray-900">
                Reset Password
            </h2>

            <p className="text-gray-600 text-sm text-center mt-2 mb-6">
                Enter your new password below.
            </p>

            <form onSubmit={handleSubmit}>

                {/* New Password */}
                <div className="relative mb-4">
                    <label className="block mb-1">
                        New Password
                    </label>

                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter new password"
                        className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-9 text-gray-500"
                    >
                        {showPassword
                            ? <Eye size={20} />
                            : <EyeOff size={20} />
                        }
                    </button>
                </div>

                {/* Confirm Password */}
                <div className="relative mb-4">
                    <label className="block mb-1">
                        Confirm Password
                    </label>

                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                        className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                    />

                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-9 text-gray-500"
                    >
                        {showConfirmPassword
                            ? <Eye size={20} />
                            : <EyeOff size={20} />
                        }
                    </button>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full p-3 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-600"
                >
                    {loading ? "Resetting..." : "Reset Password"}
                </button>

            </form>

            {success && (
                <p className="text-green-600 mt-4">
                    {success}
                </p>
            )}

            {error && (
                <p className="text-red-500 mt-4">
                    {error}
                </p>
            )}

        </div>
    );
}