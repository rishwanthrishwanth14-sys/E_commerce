import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../service/productService";
import { getCategories } from "../../service/categorieService";
import { getMyProfile } from "../../service/adminService";

function AdminDashboard() {
  const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState({
    products: 0,
    active: 0,
    outOfStock: 0,
    categories: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [productResult, categoryResult, profileResult] = await Promise.all([
          getProducts(),
          getCategories(),
          getMyProfile()
        ]);
        const products = productResult.data || [];
        const categories = categoryResult.data || [];

        setProfile(profileResult.data || null);

        setStats({
          products: products.length,
          active: products.filter((p) => Number(p.status) === 1).length,
          outOfStock: products.filter((p) => Number(p.quantity) <= 0).length,
          categories: categories.length
        });
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const cards = [
    ["Total Products", stats.products, "bi-box-seam"],
    ["Active Products", stats.active, "bi-check-circle"],
    ["Out of Stock", stats.outOfStock, "bi-exclamation-triangle"],
    ["Total Categories", stats.categories, "bi-grid"]
  ];

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">Dashboard</h2>
          <p className="text-muted mb-0">Manage your products and store</p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate("/admin/products/create")}>
          <i className="bi bi-plus-lg me-2"></i>Add Product
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {profile && (
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body">
            <h5 className="fw-bold mb-1">{profile.firstname} {profile.lastname}</h5>
            <p className="text-muted mb-0">{profile.email}</p>
          </div>
        </div>
      )}

      <div className="row g-4">
        {cards.map(([title, value, icon]) => (
          <div className="col-xl-3 col-md-6" key={title}>
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body d-flex justify-content-between">
                <div>
                  <p className="text-muted mb-2">{title}</p>
                  <h3 className="fw-bold">{loading ? "..." : value}</h3>
                </div>
                <div className="fs-1 text-primary">
                  <i className={`bi ${icon}`}></i>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4 mt-2">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="fs-2 text-primary mb-3"><i className="bi bi-plus-square"></i></div>
              <h5 className="fw-bold">Add Product</h5>
              <p className="text-muted">Create a new product and upload images.</p>
              <button className="btn btn-primary" onClick={() => navigate("/admin/products/create")}>Create</button>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="fs-2 text-success mb-3"><i className="bi bi-boxes"></i></div>
              <h5 className="fw-bold">Manage Products</h5>
              <p className="text-muted">View your real products from the database.</p>
              <button className="btn btn-outline-primary" onClick={() => navigate("/admin/products")}>Products</button>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="fs-2 text-warning mb-3"><i className="bi bi-grid"></i></div>
              <h5 className="fw-bold">Categories</h5>
              <p className="text-muted">Manage your real product categories.</p>
              <button className="btn btn-outline-primary" onClick={() => navigate("/admin/categories")}>Categories</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
