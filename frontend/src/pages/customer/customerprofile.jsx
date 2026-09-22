import { useState, useEffect } from "react";
import { getMyProfile, updateMyProfile } from "../../service/customerService";

const CustomerProfile = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    company: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    postcode: "",
    country: ""
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const result = await getMyProfile();
        setFormData((prev) => ({ ...prev, ...(result.data || {}) }));
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load profile")
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");


    try {
      const { email, ...editableFields } = formData;
      const result = await updateMyProfile(editableFields);
      setMessage(result.message || "Profile updated successfully");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center py-5"><div className="spinner-border" /></div>;
  }

  return (
    <div>
      <h3 className="mb-4">My Profile</h3>

      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              {[
                ["firstName", "First Name"],
                ["lastName", "Last Name"],
                ["email", "Email"],
                ["phoneNumber", "Phone"],
                ["company", "Company"],
                ["address1", "Address"],
                ["address2", "Address 2"],
                ["city", "City"],
                ["state", "State"],
                ["postcode", "Postcode"],
                ["country", "Country"]
              ].map(([name, label]) => (
                <div className={name === "address1" || name === "address2" ? "col-12" : "col-md-6"} key={name}>
                  <label className="form-label">{label}</label>
                  <input
                    type="text"
                    name={name}
                    className="form-control"
                    value={formData[name] || ""}
                    onChange={handleChange}
                    readOnly={name === "email"}
                  />
                </div>
              ))}

              <div className="col-12">
                <button className="btn btn-primary" disabled={saving}>
                  {saving ? "Saving..." : "Update Profile"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;

