import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../service/api";
import "./customerLogin.css";

const CustomerLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

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
            localStorage.setItem("role", "customer");

            if (data.role) {
                localStorage.setItem("role", data.role);
            }

            setMessage("Login successful!");

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
        <div className="customer-login-page">

            <div className="container">

                <div className="row justify-content-center">

                    <div className="col-12 col-lg-9 col-xl-8">

                        <div className="customer-login-card row">

                            {/* LEFT SIDE */}

                            <div className="customer-login-left col-md-5">

                                <div className="customer-login-icon">
                                    <i className="bi bi-bag-check-fill"></i>
                                </div>

                                <h2>Welcome Back!</h2>

                                <p>
                                    Sign in to your account and continue
                                    shopping with ShopHub.
                                </p>

                                <div className="customer-login-features">

                                    <div className="customer-login-feature">
                                        <i className="bi bi-check-circle-fill"></i>
                                        <span>Easy and secure shopping</span>
                                    </div>

                                    <div className="customer-login-feature">
                                        <i className="bi bi-check-circle-fill"></i>
                                        <span>Track your orders</span>
                                    </div>

                                    <div className="customer-login-feature">
                                        <i className="bi bi-check-circle-fill"></i>
                                        <span>Manage your profile</span>
                                    </div>

                                </div>

                            </div>


                            {/* RIGHT SIDE */}

                            <div className="customer-login-right col-md-7">

                                <div className="customer-login-heading">

                                    <h3>Customer Sign In</h3>

                                    <p>
                                        Enter your details to access your account.
                                    </p>

                                </div>


                                {message && (
                                    <div
                                        className={`customer-login-message ${
                                            message.toLowerCase().includes("successful")
                                                ? "success"
                                                : "error"
                                        }`}
                                    >
                                        {message}
                                    </div>
                                )}


                                <form onSubmit={handleLogin}>

                                    {/* EMAIL */}

                                    <div className="customer-login-field">

                                        <label htmlFor="email">
                                            Email Address
                                        </label>

                                        <div className="customer-login-input">

                                            <span>
                                                <i className="bi bi-envelope"></i>
                                            </span>

                                            <input
                                                id="email"
                                                type="email"
                                                value={email}
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                                placeholder="Enter your email"
                                                required
                                            />

                                        </div>

                                    </div>


                                    {/* PASSWORD */}

                                    <div className="customer-login-field">

                                        <label htmlFor="password">
                                            Password
                                        </label>

                                        <div className="customer-login-input">

                                            <span>
                                                <i className="bi bi-lock"></i>
                                            </span>

                                            <input
                                                id="password"
                                                type="password"
                                                value={password}
                                                onChange={(e) =>
                                                    setPassword(e.target.value)
                                                }
                                                placeholder="Enter your password"
                                                required
                                            />

                                        </div>

                                    </div>


                                    {/* LOGIN BUTTON */}

                                    <button
                                        type="submit"
                                        className="customer-login-button"
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
                                                <i className="bi bi-box-arrow-in-right me-2"></i>
                                                Sign In
                                            </>
                                        )}
                                    </button>

                                </form>


                                {/* REGISTER */}

                                <div className="customer-login-register">

                                    <span>
                                        Don't have an account?
                                    </span>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            navigate("/customer/register")
                                        }
                                    >
                                        Create Account
                                    </button>

                                </div>


                                {/* BACK HOME */}

                                <div className="customer-login-home">

                                    <button
                                        type="button"
                                        onClick={() => navigate("/")}
                                    >
                                        <i className="bi bi-arrow-left me-1"></i>
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