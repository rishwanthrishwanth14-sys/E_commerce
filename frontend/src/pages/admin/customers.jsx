import { useEffect, useState } from "react";
import { getAdminCustomers } from "../../service/adminCustomerService";

const AdminCustomers = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadCustomers = async () => {
            try {
                const result = await getAdminCustomers();
                setCustomers(result.data || []);
            } catch (err) {
                setError(
                    err.response?.data?.message ||
                    "Failed to load customers"
                );
            } finally {
                setLoading(false);
            }
        };

        loadCustomers();
    }, []);

    if (loading) {
        return <div className="text-center py-5">Loading customers...</div>;
    }

    return (
        <div className="container-fluid py-4">
            <h3 className="mb-4">Customers</h3>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="card border-0 shadow-sm">
                <div className="table-responsive">
                    <table className="table align-middle mb-0">
                        <thead className="table-light">
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Location</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map((customer, index) => (
                                <tr key={customer.customerId}>
                                    <td>{index + 1}</td>
                                    <td>{customer.firstName} {customer.lastName}</td>
                                    <td>{customer.email}</td>
                                    <td>{customer.phoneNumber || "-"}</td>
                                    <td>{[customer.city, customer.state, customer.country].filter(Boolean).join(", ") || "-"}</td>
                                    <td>
                                        <span className={`badge ${Number(customer.status) === 1 ? "text-bg-success" : "text-bg-secondary"}`}>
                                            {Number(customer.status) === 1 ? "Active" : "Inactive"}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminCustomers;
