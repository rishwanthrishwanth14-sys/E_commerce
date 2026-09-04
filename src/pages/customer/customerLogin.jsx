import { useState } from "react";
import api from "../../service/api";

const CustomerLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

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

            // Save customer JWT token
            localStorage.setItem("token", data.token);

            // Save role
            if (data.role) {
                localStorage.setItem("role", data.role);
            }

            setMessage("Login successful!");

            console.log("Login response:", data);

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
        <div>

            <h1>Customer Login</h1>

            <form onSubmit={handleLogin}>

                <div>
                    <label>Email</label>

                    <input
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <br />

                <div>
                    <label>Password</label>

                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <br />

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

            </form>

            {message && (
                <p>{message}</p>
            )}

        </div>
    );
};

export default CustomerLogin;