import { useEffect, useState } from "react";
import {
    getAddresses,
    createAddress,
    updateAddress,
    deleteAddress
} from "../../service/addressService";

const CustomerAddresses = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const emptyForm = {
    firstName: "", lastName: "", company: "", address1: "", address2: "",
    city: "", state: "", postcode: "", country: "", phoneNumber: ""
  };
  const [formData, setFormData] = useState(emptyForm);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      setError("");
      const result = await getAddresses();
      setAddresses(result.data || []);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to fetch addresses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadInitialAddresses = async () => {
      await fetchAddresses();
    };

    loadInitialAddresses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData(emptyForm);
    setEditingAddressId(null);
  };

  const handleAddAddress = () => {
    resetForm();
    setError("");
    setSuccess("");
    setShowModal(true);
  };

  const handleEdit = (address) => {
    setEditingAddressId(address.addressId);
    setFormData({
      firstName: address.firstName || "",
      lastName: address.lastName || "",
      company: address.company || "",
      address1: address.address1 || "",
      address2: address.address2 || "",
      city: address.city || "",
      state: address.state || "",
      postcode: address.postcode || "",
      country: address.country || "",
      phoneNumber: address.phoneNumber || ""
    });
    setError("");
    setSuccess("");
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const result = editingAddressId
        ? await updateAddress(editingAddressId, formData)
        : await createAddress(formData);

      setSuccess(result.message || "Address saved successfully");
      setShowModal(false);
      resetForm();
      await fetchAddresses();
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (addressId) => {
    if (!window.confirm("Are you sure you want to delete this address?")) return;

    try {
      setError("");
      setSuccess("");
      const result = await deleteAddress(addressId);
      setSuccess(result.message || "Address deleted successfully");
      setAddresses((prev) => prev.filter((address) => address.addressId !== addressId));
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to delete address");
    }
  };

  return (
    <div>

      {/* =========================
          PAGE HEADER
      ========================== */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h3 className="mb-1">
            My Addresses
          </h3>

          <p className="text-muted mb-0">
            Manage your saved delivery addresses
          </p>

        </div>

        <button
          className="btn btn-primary"
          onClick={handleAddAddress}
        >
          <i className="bi bi-plus-lg me-2"></i>
          Add Address
        </button>

      </div>


      {/* =========================
          SUCCESS MESSAGE
      ========================== */}

      {success && (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          <i className="bi bi-check-circle me-2"></i>
          {success}

          <button
            type="button"
            className="btn-close"
            onClick={() => setSuccess("")}
          ></button>

        </div>
      )}


      {/* =========================
          ERROR MESSAGE
      ========================== */}

      {error && (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          <i className="bi bi-exclamation-circle me-2"></i>
          {error}

          <button
            type="button"
            className="btn-close"
            onClick={() => setError("")}
          ></button>

        </div>
      )}


      {/* =========================
          LOADING
      ========================== */}

      {loading ? (

        <div className="text-center py-5">

          <div
            className="spinner-border text-primary"
            role="status"
          >
            <span className="visually-hidden">
              Loading...
            </span>
          </div>

          <p className="text-muted mt-3">
            Loading addresses...
          </p>

        </div>

      ) : addresses.length === 0 ? (

        /* =========================
           EMPTY STATE
        ========================== */

        <div className="card border-0 shadow-sm">

          <div className="card-body text-center py-5">

            <i className="bi bi-geo-alt fs-1 text-muted"></i>

            <h5 className="mt-3">
              No addresses found
            </h5>

            <p className="text-muted">
              Add an address to make your checkout faster.
            </p>

            <button
              className="btn btn-primary"
              onClick={handleAddAddress}
            >
              <i className="bi bi-plus-lg me-2"></i>
              Add Address
            </button>

          </div>

        </div>

      ) : (

        /* =========================
           ADDRESS CARDS
        ========================== */

        <div className="row g-4">

          {addresses.map((address) => (

            <div
              className="col-md-6"
              key={address.addressId}
            >

              <div className="card border-0 shadow-sm h-100">

                <div className="card-body">

                  {/* NAME */}

                  <div className="d-flex justify-content-between align-items-start mb-3">

                    <div>

                      <h5 className="mb-1">
                        {address.firstName}{" "}
                        {address.lastName}
                      </h5>

                      {address.company && (
                        <small className="text-muted">
                          {address.company}
                        </small>
                      )}

                    </div>

                    <span className="badge text-bg-light">
                      <i className="bi bi-house me-1"></i>
                      Address
                    </span>

                  </div>


                  {/* ADDRESS */}

                  <div className="mb-3">

                    <p className="text-muted mb-1">
                      {address.address1}
                    </p>

                    {address.address2 && (
                      <p className="text-muted mb-1">
                        {address.address2}
                      </p>
                    )}

                    <p className="text-muted mb-1">
                      {address.city},{" "}
                      {address.state}
                    </p>

                    <p className="text-muted mb-1">
                      {address.postcode}
                    </p>

                    <p className="text-muted mb-0">
                      {address.country}
                    </p>

                  </div>


                  {/* PHONE */}

                  {address.phoneNumber && (

                    <div className="mb-3">

                      <span className="fw-semibold">
                        <i className="bi bi-telephone me-2"></i>
                        Phone:
                      </span>

                      <span className="text-muted ms-2">
                        {address.phoneNumber}
                      </span>

                    </div>

                  )}


                  {/* ACTIONS */}

                  <div className="d-flex gap-2 pt-3 border-top">

                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() =>
                        handleEdit(address)
                      }
                    >
                      <i className="bi bi-pencil me-1"></i>
                      Edit
                    </button>

                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() =>
                        handleDelete(address.addressId)
                      }
                    >
                      <i className="bi bi-trash me-1"></i>
                      Delete
                    </button>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}


      {/* =================================================
          ADD / EDIT ADDRESS MODAL
      ================================================== */}

      {showModal && (

        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{
            backgroundColor: "rgba(0,0,0,0.5)"
          }}
        >

          <div className="modal-dialog modal-lg modal-dialog-centered">

            <div className="modal-content">

              {/* MODAL HEADER */}

              <div className="modal-header">

                <h5 className="modal-title">

                  {editingAddressId
                    ? "Edit Address"
                    : "Add New Address"}

                </h5>

                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                ></button>

              </div>


              {/* MODAL BODY */}

              <form onSubmit={handleSubmit}>

                <div className="modal-body">

                  <div className="row g-3">


                    {/* FIRST NAME */}

                    <div className="col-md-6">

                      <label className="form-label">
                        First Name
                        <span className="text-danger">
                          *
                        </span>
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />

                    </div>


                    {/* LAST NAME */}

                    <div className="col-md-6">

                      <label className="form-label">
                        Last Name
                        <span className="text-danger">
                          *
                        </span>
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />

                    </div>


                    {/* COMPANY */}

                    <div className="col-md-12">

                      <label className="form-label">
                        Company
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                      />

                    </div>


                    {/* ADDRESS 1 */}

                    <div className="col-md-12">

                      <label className="form-label">
                        Address Line 1
                        <span className="text-danger">
                          *
                        </span>
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        name="address1"
                        value={formData.address1}
                        onChange={handleChange}
                        required
                      />

                    </div>


                    {/* ADDRESS 2 */}

                    <div className="col-md-12">

                      <label className="form-label">
                        Address Line 2
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        name="address2"
                        value={formData.address2}
                        onChange={handleChange}
                      />

                    </div>


                    {/* CITY */}

                    <div className="col-md-4">

                      <label className="form-label">
                        City
                        <span className="text-danger">
                          *
                        </span>
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                      />

                    </div>


                    {/* STATE */}

                    <div className="col-md-4">

                      <label className="form-label">
                        State
                        <span className="text-danger">
                          *
                        </span>
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                      />

                    </div>


                    {/* POSTCODE */}

                    <div className="col-md-4">

                      <label className="form-label">
                        Postcode
                        <span className="text-danger">
                          *
                        </span>
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        name="postcode"
                        value={formData.postcode}
                        onChange={handleChange}
                        required
                      />

                    </div>


                    {/* COUNTRY */}

                    <div className="col-md-6">

                      <label className="form-label">
                        Country
                        <span className="text-danger">
                          *
                        </span>
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                      />

                    </div>


                    {/* PHONE */}

                    <div className="col-md-6">

                      <label className="form-label">
                        Phone Number
                      </label>

                      <input
                        type="tel"
                        className="form-control"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                      />

                    </div>

                  </div>

                </div>


                {/* MODAL FOOTER */}

                <div className="modal-footer">

                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setShowModal(false);
                      resetForm();
                    }}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={saving}
                  >

                    {saving ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                        ></span>

                        Saving...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check-lg me-2"></i>

                        {editingAddressId
                          ? "Update Address"
                          : "Save Address"}
                      </>
                    )}

                  </button>

                </div>

              </form>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default CustomerAddresses;