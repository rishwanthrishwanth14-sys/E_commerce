import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../service/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await api.post("/api/user/login", {
        email,
        password,
      });

      const data = response.data;

      // Save JWT token
      localStorage.setItem("token", data.token);

      // Login success
      navigate("/customer/dashboard");

    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center py-5">

      <div className="container">
        <div className="row justify-content-center">

          <div className="col-12 col-sm-10 col-md-7 col-lg-5 col-xl-4">

            <div className="card border-0 shadow rounded-4">

              <div className="card-body p-4 p-md-5">

                {/* Logo */}
                <div className="text-center mb-4">

                  <div
                    className="bg-primary text-white rounded-3 d-flex align-items-center justify-content-center mx-auto mb-3"
                    style={{
                      width: "55px",
                      height: "55px",
                    }}
                  >
                    <i className="bi bi-bag-fill fs-4"></i>
                  </div>

                  <h3 className="fw-bold mb-1">
                    Welcome Back
                  </h3>

                  <p className="text-muted mb-0">
                    Sign in to your ShopHub account
                  </p>

                </div>


                {/* Error */}
                {error && (
                  <div
                    className="alert alert-danger d-flex align-items-center"
                    role="alert"
                  >
                    <i className="bi bi-exclamation-circle me-2"></i>
                    <span>{error}</span>
                  </div>
                )}


                {/* Login Form */}
                <form onSubmit={handleSubmit}>

                  {/* Email */}
                  <div className="mb-3">

                    <label className="form-label fw-semibold">
                      Email Address
                    </label>

                    <div className="input-group">

                      <span className="input-group-text bg-white">
                        <i className="bi bi-envelope text-muted"></i>
                      </span>

                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />

                    </div>

                  </div>


                  {/* Password */}
                  <div className="mb-4">

                    <label className="form-label fw-semibold">
                      Password
                    </label>

                    <div className="input-group">

                      <span className="input-group-text bg-white">
                        <i className="bi bi-lock text-muted"></i>
                      </span>

                      <input
                        type="password"
                        className="form-control"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />

                    </div>

                  </div>


                  {/* Login Button */}
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

                        Logging in...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-box-arrow-in-right me-2"></i>
                        Login
                      </>
                    )}
                  </button>

                </form>


                {/* Sign Up */}
                <div className="text-center mt-4">

                  <span className="text-muted">
                    Only access for admin
                  </span>

                </div>


                {/* Back Home */}
                <div className="text-center mt-3">

                  <button
                    type="button"
                    className="btn btn-sm btn-light"
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
}

export default Login;

