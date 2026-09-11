import { useNavigate } from "react-router-dom";

function AdminDashboard() {

  const navigate = useNavigate();

  return (
    <div className="container-fluid">

      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h2 className="fw-bold mb-1">
            Dashboard
          </h2>

          <p className="text-muted mb-0">
            Manage your products and store
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => navigate("/admin/products/create")}
        >
          <i className="bi bi-plus-lg me-2"></i>
          Add Product
        </button>

      </div>


      {/* Statistics */}
      <div className="row g-4">

        {/* Total Products */}
        <div className="col-xl-3 col-md-6">

          <div className="card border-0 shadow-sm h-100">

            <div className="card-body d-flex justify-content-between">

              <div>

                <p className="text-muted mb-2">
                  Total Products
                </p>

                <h3 className="fw-bold">
                  356
                </h3>

                <small className="text-success">
                  +8 this month
                </small>

              </div>

              <div className="fs-1 text-primary">
                <i className="bi bi-box-seam"></i>
              </div>

            </div>

          </div>

        </div>


        {/* Active Products */}
        <div className="col-xl-3 col-md-6">

          <div className="card border-0 shadow-sm h-100">

            <div className="card-body d-flex justify-content-between">

              <div>

                <p className="text-muted mb-2">
                  Active Products
                </p>

                <h3 className="fw-bold">
                  328
                </h3>

                <small className="text-success">
                  92% of total products
                </small>

              </div>

              <div className="fs-1 text-success">
                <i className="bi bi-check-circle"></i>
              </div>

            </div>

          </div>

        </div>


        {/* Out of Stock */}
        <div className="col-xl-3 col-md-6">

          <div className="card border-0 shadow-sm h-100">

            <div className="card-body d-flex justify-content-between">

              <div>

                <p className="text-muted mb-2">
                  Out of Stock
                </p>

                <h3 className="fw-bold">
                  18
                </h3>

                <small className="text-danger">
                  Need attention
                </small>

              </div>

              <div className="fs-1 text-danger">
                <i className="bi bi-exclamation-triangle"></i>
              </div>

            </div>

          </div>

        </div>


        {/* Categories */}
        <div className="col-xl-3 col-md-6">

          <div className="card border-0 shadow-sm h-100">

            <div className="card-body d-flex justify-content-between">

              <div>

                <p className="text-muted mb-2">
                  Total Categories
                </p>

                <h3 className="fw-bold">
                  24
                </h3>

                <small className="text-primary">
                  Product categories
                </small>

              </div>

              <div className="fs-1 text-primary">
                <i className="bi bi-grid"></i>
              </div>

            </div>

          </div>

        </div>

      </div>


      {/* Quick Actions */}
      <div className="row g-4 mt-2">

        <div className="col-md-4">

          <div
            className="card border-0 shadow-sm h-100"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/admin/products/create")}
          >

            <div className="card-body">

              <div className="fs-2 text-primary mb-3">
                <i className="bi bi-plus-square"></i>
              </div>

              <h5 className="fw-bold">
                Add Product
              </h5>

              <p className="text-muted mb-0">
                Create a new product and upload product images.
              </p>

            </div>

          </div>

        </div>


        <div className="col-md-4">

          <div
            className="card border-0 shadow-sm h-100"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/admin/products")}
          >

            <div className="card-body">

              <div className="fs-2 text-success mb-3">
                <i className="bi bi-boxes"></i>
              </div>

              <h5 className="fw-bold">
                Manage Products
              </h5>

              <p className="text-muted mb-0">
                View, edit and delete your products.
              </p>

            </div>

          </div>

        </div>


        <div className="col-md-4">

          <div
            className="card border-0 shadow-sm h-100"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/admin/categories")}
          >

            <div className="card-body">

              <div className="fs-2 text-warning mb-3">
                <i className="bi bi-tags"></i>
              </div>

              <h5 className="fw-bold">
                Manage Categories
              </h5>

              <p className="text-muted mb-0">
                Create and manage product categories.
              </p>

            </div>

          </div>

        </div>

      </div>


      {/* Recent Products */}
      <div className="card border-0 shadow-sm mt-4">

        <div className="card-body">

          <div className="d-flex justify-content-between align-items-center mb-3">

            <h5 className="fw-bold mb-0">
              Recent Products
            </h5>

            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => navigate("/admin/products")}
            >
              View All
            </button>

          </div>


          <div className="table-responsive">

            <table className="table table-hover align-middle">

              <thead>

                <tr>
                  <th>Product</th>
                  <th>SKU</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Status</th>
                </tr>

              </thead>


              <tbody>

                <tr>

                  <td>
                    Nike Air Max
                  </td>

                  <td>
                    NK-AM-001
                  </td>

                  <td>
                    ₹2,499
                  </td>

                  <td>
                    25
                  </td>

                  <td>
                    <span className="badge bg-success">
                      Active
                    </span>
                  </td>

                </tr>


                <tr>

                  <td>
                    Adidas Running Shoes
                  </td>

                  <td>
                    AD-RS-002
                  </td>

                  <td>
                    ₹3,199
                  </td>

                  <td>
                    12
                  </td>

                  <td>
                    <span className="badge bg-success">
                      Active
                    </span>
                  </td>

                </tr>


                <tr>

                  <td>
                    Puma Sports Shoes
                  </td>

                  <td>
                    PM-SS-003
                  </td>

                  <td>
                    ₹2,899
                  </td>

                  <td>
                    3
                  </td>

                  <td>
                    <span className="badge bg-warning text-dark">
                      Low Stock
                    </span>
                  </td>

                </tr>


                <tr>

                  <td>
                    Reebok Classic
                  </td>

                  <td>
                    RB-CL-004
                  </td>

                  <td>
                    ₹2,299
                  </td>

                  <td>
                    0
                  </td>

                  <td>
                    <span className="badge bg-danger">
                      Out of Stock
                    </span>
                  </td>

                </tr>

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;