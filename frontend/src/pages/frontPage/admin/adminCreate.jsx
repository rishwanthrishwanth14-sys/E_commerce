import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAdmin } from "../../../service/adminService";
import "./adminCreate.css"

const CreateAdmin = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        userType: "user",
        image: "",
        status: "1",
        createdBy: ""
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
            const response = await createAdmin(formData);

            setMessage(
                response.data.message || "Admin created successfully!"
            );

            setFormData({
                firstname: "",
                lastname: "",
                email: "",
                password: "",
                userType: "admin",
                image: "",
                status: "1",
                createdBy: ""
            });

            setTimeout(() => {
                navigate("/admin/dashboard");
            }, 500);

        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Admin creation failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-create-page">

            <div className="container">

                <div className="row justify-content-center">

                    <div className="col-12 col-lg-8">

                        <div className="card border-0 shadow rounded-4">

                            <div className="card-body p-4 p-md-5">

                                {/* Header */}
                                <div className="admin-create-header">

                                    <div
                                        className="bg-primary text-white rounded-3 d-flex align-items-center justify-content-center mx-auto mb-3"
                                    >
                                        <i className="bi bi-person-plus-fill fs-4"></i>
                                    </div>

                                    <h2 className="fw-bold mb-1">
                                        Create Admin
                                    </h2>

                                    <p className="text-muted mb-0">
                                        Only authorized admins can create a new admin account.
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
                                            Admin Information
                                        </h5>

                                        <div className="row g-3">

                                            {/* First Name */}
                                            <div className="col-md-6">

                                                <label className="form-label fw-semibold">
                                                    First Name
                                                </label>

                                                <input
                                                    type="text"
                                                    name="firstname"
                                                    className="form-control"
                                                    placeholder="Enter first name"
                                                    value={formData.firstname}
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
                                                    name="lastname"
                                                    className="form-control"
                                                    placeholder="Enter last name"
                                                    value={formData.lastname}
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

                                            {/* Password */}
                                            <div className="col-md-6">

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
                                                        placeholder="Enter password"
                                                        value={formData.password}
                                                        onChange={handleChange}
                                                        required
                                                    />

                                                </div>

                                            </div>

                                            {/* User Type */}
                                            <div className="col-md-6">

                                                <label className="form-label fw-semibold">
                                                    User Type
                                                </label>

                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value="Admin"
                                                    disabled
                                                />

                                            </div>

                                            {/* Status */}
                                            <div className="col-md-6">

                                                <label className="form-label fw-semibold">
                                                    Status
                                                </label>

                                                <select
                                                    name="status"
                                                    className="form-select"
                                                    value={formData.status}
                                                    onChange={handleChange}
                                                >
                                                    <option value="1">
                                                        Active
                                                    </option>

                                                    <option value="0">
                                                        Inactive
                                                    </option>
                                                </select>

                                            </div>

                                        </div>

                                    </div>

                                    {/* Submit */}
                                    <div className="d-grid">

                                        <button
                                            type="submit"
                                            className="btn btn-primary py-2 fw-semibold"
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <>
                                                    <span
                                                        className="spinner-border spinner-border-sm me-2"
                                                    ></span>

                                                    Creating...
                                                </>
                                            ) : (
                                                <>
                                                    <i className="bi bi-person-plus me-2"></i>
                                                    Create Admin
                                                </>
                                            )}
                                        </button>

                                    </div>

                                    {/* Back */}
                                    <div className="text-center mt-3">

                                        <button
                                            type="button"
                                            className="btn btn-sm btn-light"
                                            onClick={() => navigate("/admin/dashboard")}
                                        >
                                            <i className="bi bi-arrow-left me-1"></i>
                                            Back to Dashboard
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

export default CreateAdmin;