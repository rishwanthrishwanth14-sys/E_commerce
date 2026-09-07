import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../service/api";

const CreateCustomer = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        company: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        postcode: "",
        country: ""
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setMessage("");

        try {
            const response = await api.post(
                "/api/customer/register",
                formData
            );

            setMessage(
                response.data.message || "Customer created successfully!"
            );

            // Clear form
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                phoneNumber: "",
                password: "",
                company: "",
                address1: "",
                address2: "",
                city: "",
                state: "",
                postcode: "",
                country: ""
            });

        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Customer creation failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-vh-100 bg-light py-5">

            <div className="container">

                <div className="row justify-content-center">

                    <div className="col-12 col-lg-9 col-xl-8">

                        <div className="card border-0 shadow rounded-4">

                            <div className="card-body p-4 p-md-5">

                                {/* Header */}
                                <div className="text-center mb-4">

                                    <div
                                        className="bg-primary text-white rounded-3 d-flex align-items-center justify-content-center mx-auto mb-3"
                                        style={{
                                            width: "55px",
                                            height: "55px"
                                        }}
                                    >
                                        <i className="bi bi-person-plus-fill fs-4"></i>
                                    </div>

                                    <h2 className="fw-bold mb-1">
                                        Create Your Account
                                    </h2>

                                    <p className="text-muted mb-0">
                                        Join ShopHub and start shopping today
                                    </p>

                                </div>


                                {/* Message */}
                                {message && (
                                    <div
                                        className={`alert ${
                                            message.toLowerCase().includes("success")
                                                ? "alert-success"
                                                : "alert-danger"
                                        } d-flex align-items-center`}
                                        role="alert"
                                    >
                                        <i
                                            className={`bi ${
                                                message.toLowerCase().includes("success")
                                                    ? "bi-check-circle"
                                                    : "bi-exclamation-circle"
                                            } me-2`}
                                        ></i>

                                        {message}
                                    </div>
                                )}


                                <form onSubmit={handleSubmit}>

                                    {/* Personal Information */}
                                    <div className="mb-4">

                                        <h5 className="fw-bold mb-3">
                                            <i className="bi bi-person me-2 text-primary"></i>
                                            Personal Information
                                        </h5>

                                        <div className="row g-3">

                                            {/* First Name */}
                                            <div className="col-md-6">

                                                <label className="form-label fw-semibold">
                                                    First Name
                                                </label>

                                                <input
                                                    type="text"
                                                    name="firstName"
                                                    className="form-control"
                                                    placeholder="Enter first name"
                                                    value={formData.firstName}
                                                    onChange={handleChange}
                                                    required
                                                />

                                            </div>


                                            {/* Last Name */}
                                            <div className="col-md-6">

                                                <label className="form-label fw-semibold">
                                                    Last Name
                                                </label>

                                                <input
                                                    type="text"
                                                    name="lastName"
                                                    className="form-control"
                                                    placeholder="Enter last name"
                                                    value={formData.lastName}
                                                    onChange={handleChange}
                                                    required
                                                />

                                            </div>


                                            {/* Email */}
                                            <div className="col-md-6">

                                                <label className="form-label fw-semibold">
                                                    Email Address
                                                </label>

                                                <div className="input-group">

                                                    <span className="input-group-text bg-white">
                                                        <i className="bi bi-envelope text-muted"></i>
                                                    </span>

                                                    <input
                                                        type="email"
                                                        name="email"
                                                        className="form-control"
                                                        placeholder="Enter email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        required
                                                    />

                                                </div>

                                            </div>


                                            {/* Phone */}
                                            <div className="col-md-6">

                                                <label className="form-label fw-semibold">
                                                    Phone Number
                                                </label>

                                                <div className="input-group">

                                                    <span className="input-group-text bg-white">
                                                        <i className="bi bi-telephone text-muted"></i>
                                                    </span>

                                                    <input
                                                        type="text"
                                                        name="phoneNumber"
                                                        className="form-control"
                                                        placeholder="Enter phone number"
                                                        value={formData.phoneNumber}
                                                        onChange={handleChange}
                                                    />

                                                </div>

                                            </div>


                                            {/* Password */}
                                            <div className="col-12">

                                                <label className="form-label fw-semibold">
                                                    Password
                                                </label>

                                                <div className="input-group">

                                                    <span className="input-group-text bg-white">
                                                        <i className="bi bi-lock text-muted"></i>
                                                    </span>

                                                    <input
                                                        type="password"
                                                        name="password"
                                                        className="form-control"
                                                        placeholder="Create a password"
                                                        value={formData.password}
                                                        onChange={handleChange}
                                                        required
                                                    />

                                                </div>

                                            </div>

                                        </div>

                                    </div>


                                    <hr className="my-4" />


                                    {/* Company Information */}
                                    <div className="mb-4">

                                        <h5 className="fw-bold mb-3">
                                            <i className="bi bi-building me-2 text-primary"></i>
                                            Company Information
                                        </h5>

                                        <div className="row g-3">

                                            <div className="col-12">

                                                <label className="form-label fw-semibold">
                                                    Company
                                                    <span className="text-muted fw-normal">
                                                        {" "} (Optional)
                                                    </span>
                                                </label>

                                                <input
                                                    type="text"
                                                    name="company"
                                                    className="form-control"
                                                    placeholder="Enter company name"
                                                    value={formData.company}
                                                    onChange={handleChange}
                                                />

                                            </div>

                                        </div>

                                    </div>


                                    <hr className="my-4" />


                                    {/* Address Information */}
                                    <div className="mb-4">

                                        <h5 className="fw-bold mb-3">
                                            <i className="bi bi-geo-alt me-2 text-primary"></i>
                                            Address Information
                                        </h5>

                                        <div className="row g-3">

                                            {/* Address 1 */}
                                            <div className="col-12">

                                                <label className="form-label fw-semibold">
                                                    Address Line 1
                                                </label>

                                                <input
                                                    type="text"
                                                    name="address1"
                                                    className="form-control"
                                                    placeholder="Enter address"
                                                    value={formData.address1}
                                                    onChange={handleChange}
                                                />

                                            </div>


                                            {/* Address 2 */}
                                            <div className="col-12">

                                                <label className="form-label fw-semibold">
                                                    Address Line 2
                                                    <span className="text-muted fw-normal">
                                                        {" "} (Optional)
                                                    </span>
                                                </label>

                                                <input
                                                    type="text"
                                                    name="address2"
                                                    className="form-control"
                                                    placeholder="Apartment, suite, etc."
                                                    value={formData.address2}
                                                    onChange={handleChange}
                                                />

                                            </div>


                                            {/* City */}
                                            <div className="col-md-6">

                                                <label className="form-label fw-semibold">
                                                    City
                                                </label>

                                                <input
                                                    type="text"
                                                    name="city"
                                                    className="form-control"
                                                    placeholder="Enter city"
                                                    value={formData.city}
                                                    onChange={handleChange}
                                                />

                                            </div>


                                            {/* State */}
                                            <div className="col-md-6">

                                                <label className="form-label fw-semibold">
                                                    State
                                                </label>

                                                <input
                                                    type="text"
                                                    name="state"
                                                    className="form-control"
                                                    placeholder="Enter state"
                                                    value={formData.state}
                                                    onChange={handleChange}
                                                />

                                            </div>


                                            {/* Postcode */}
                                            <div className="col-md-6">

                                                <label className="form-label fw-semibold">
                                                    Postcode
                                                </label>

                                                <input
                                                    type="text"
                                                    name="postcode"
                                                    className="form-control"
                                                    placeholder="Enter postcode"
                                                    value={formData.postcode}
                                                    onChange={handleChange}
                                                />

                                            </div>


                                            {/* Country */}
                                            <div className="col-md-6">

                                                <label className="form-label fw-semibold">
                                                    Country
                                                </label>

                                                <input
                                                    type="text"
                                                    name="country"
                                                    className="form-control"
                                                    placeholder="Enter country"
                                                    value={formData.country}
                                                    onChange={handleChange}
                                                />

                                            </div>

                                        </div>

                                    </div>


                                    {/* Submit */}
                                    <div className="d-grid gap-2">

                                        <button
                                            type="submit"
                                            className="btn btn-primary py-2 fw-semibold"
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <>
                                                    <span
                                                        className="spinner-border spinner-border-sm me-2"
                                                        role="status"
                                                    ></span>

                                                    Creating Account...
                                                </>
                                            ) : (
                                                <>
                                                    <i className="bi bi-person-plus me-2"></i>
                                                    Create Account
                                                </>
                                            )}
                                        </button>

                                    </div>


                                    {/* Login */}
                                    <div className="text-center mt-4">

                                        <span className="text-muted">
                                            Already have an account?
                                        </span>

                                        <button
                                            type="button"
                                            className="btn btn-link text-decoration-none fw-semibold p-0 ms-1"
                                            onClick={() =>
                                                navigate("/customer/login")
                                            }
                                        >
                                            Sign In
                                        </button>

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

                                </form>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default CreateCustomer;

