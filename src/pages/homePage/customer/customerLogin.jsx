
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../service/api";

const CustomerLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        setLoading(true);
        setMessage("");

        try {
            const response = await api.post(
                "/api/customer/login",
                {
                    email,
                    password
                }
            );

            const data = response.data;

            localStorage.setItem("token", data.token);

            if (data.role) {
                localStorage.setItem("role", data.role);
            }

            setMessage("Login successful!");

            console.log("Login response:", data);

            setTimeout(() => {
                navigate("/customer/dashboard");
            }, 500);

        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Login failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-vh-100 bg-light d-flex align-items-center">

            <div className="container">

                <div className="row justify-content-center">

                    <div className="col-12 col-lg-9 col-xl-8">

                        <div className="row bg-white shadow-lg rounded-4 overflow-hidden">

                            {/* LEFT SIDE */}
                            <div className="col-md-5 bg-primary text-white p-5 d-flex flex-column justify-content-center">

                                <div className="mb-4">

                                    <div
                                        className="bg-white text-primary rounded-3 d-flex align-items-center justify-content-center mb-4"
                                        style={{
                                            width: "55px",
                                            height: "55px"
                                        }}
                                    >
                                        <i className="bi bi-bag-fill fs-4"></i>
                                    </div>

                                    <h2 className="fw-bold mb-3">
                                        Welcome Back!
                                    </h2>

                                    <p className="mb-0 opacity-75">
                                        Sign in to continue shopping,
                                        manage your orders and explore
                                        our latest products.
                                    </p>

                                </div>


                                <div className="mt-4">

                                    <div className="d-flex align-items-center mb-3">
                                        <i className="bi bi-check-circle-fill me-2"></i>
                                        <span>Easy shopping experience</span>
                                    </div>

                                    <div className="d-flex align-items-center mb-3">
                                        <i className="bi bi-check-circle-fill me-2"></i>
                                        <span>Track your orders</span>
                                    </div>

                                    <div className="d-flex align-items-center">
                                        <i className="bi bi-check-circle-fill me-2"></i>
                                        <span>Manage your profile</span>
                                    </div>

                                </div>

                            </div>


                            {/* RIGHT SIDE */}
                            <div className="col-md-7 p-4 p-md-5">

                                <div className="mb-4">

                                    <h3 className="fw-bold mb-1">
                                        Customer Sign In
                                    </h3>

                                    <p className="text-muted mb-0">
                                        Enter your details to access your account
                                    </p>

                                </div>


                                {/* Message */}
                                {message && (
                                    <div
                                        className={`alert ${
                                            message === "Login successful!"
                                                ? "alert-success"
                                                : "alert-danger"
                                        }`}
                                        role="alert"
                                    >
                                        <i
                                            className={`bi ${
                                                message === "Login successful!"
                                                    ? "bi-check-circle"
                                                    : "bi-exclamation-circle"
                                            } me-2`}
                                        ></i>

                                        {message}
                                    </div>
                                )}


                                <form onSubmit={handleLogin}>

                                    {/* Email */}
                                    <div className="mb-4">

                                        <label className="form-label fw-semibold">
                                            Email Address
                                        </label>

                                        <div className="input-group">

                                            <span className="input-group-text bg-light border-end-0">
                                                <i className="bi bi-envelope text-secondary"></i>
                                            </span>

                                            <input
                                                type="email"
                                                className="form-control bg-light border-start-0 py-2"
                                                placeholder="you@example.com"
                                                value={email}
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                                required
                                            />

                                        </div>

                                    </div>


                                    {/* Password */}
                                    <div className="mb-4">

                                        <div className="d-flex justify-content-between">

                                            <label className="form-label fw-semibold">
                                                Password
                                            </label>

                                            <button
                                                type="button"
                                                className="btn btn-link btn-sm p-0 text-decoration-none"
                                            >
                                                Forgot Password?
                                            </button>

                                        </div>

                                        <div className="input-group">

                                            <span className="input-group-text bg-light border-end-0">
                                                <i className="bi bi-lock text-secondary"></i>
                                            </span>

                                            <input
                                                type="password"
                                                className="form-control bg-light border-start-0 py-2"
                                                placeholder="Enter your password"
                                                value={password}
                                                onChange={(e) =>
                                                    setPassword(e.target.value)
                                                }
                                                required
                                            />

                                        </div>

                                    </div>


                                    {/* Login */}
                                    <button
                                        type="submit"
                                        className="btn btn-primary w-100 py-2 fw-semibold"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <span
                                                    className="spinner-border spinner-border-sm me-2"
                                                    role="status"
                                                ></span>

                                                Signing In...
                                            </>
                                        ) : (
                                            <>
                                                Sign In
                                                <i className="bi bi-arrow-right ms-2"></i>
                                            </>
                                        )}
                                    </button>

                                </form>


                                {/* Signup */}
                                <div className="text-center mt-4">

                                    <span className="text-muted">
                                        New to ShopHub?
                                    </span>

                                    <button
                                        type="button"
                                        className="btn btn-link fw-semibold text-decoration-none p-0 ms-1"
                                        onClick={() =>
                                            navigate("/customer/register")
                                        }
                                    >
                                        Create an account
                                    </button>

                                </div>


                                {/* Home */}
                                <div className="text-center mt-3">

                                    <button
                                        type="button"
                                        className="btn btn-sm btn-light"
                                        onClick={() => navigate("/")}
                                    >
                                        <i className="bi bi-house me-1"></i>
                                        Back to Home
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default CustomerLogin;

