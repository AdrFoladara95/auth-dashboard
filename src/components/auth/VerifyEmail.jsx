import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { VerifyUserEmail } from "../../api/api";

export default function VerifyEmail() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        async function verifyEmail() {
            try {
                const token = searchParams.get("token");

                if (!token) {
                    setError("Invalid verification link.");
                    setLoading(false);
                    return;
                }

                await VerifyUserEmail({ token });

                setSuccess(true);
                setLoading(false);

                setTimeout(() => {
                    navigate("/");
                }, 3000);

            } catch (err) {
                setError(err.message || "Email verification failed.");
                setLoading(false);
            }
        }

        verifyEmail();
    }, [navigate, searchParams]);

    if (loading) {
        return (
            <div>
                <h2>Verifying your email...</h2>
                <p>Please wait.</p>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <h2>Verification failed</h2>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div>
            {success && (
                <>
                    <h2>Email verification successful! ✅</h2>
                    <p>Your email has been verified successfully.</p>
                    <p>Redirecting to login in......</p>
                </>
            )}
        </div>
    );
}