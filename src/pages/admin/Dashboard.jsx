function AdminDashboard() {
  return (
    <div className="container-fluid">

      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">Dashboard</h2>
          <p className="text-muted mb-0">
            Welcome back, Admin
          </p>
        </div>

        <button className="btn btn-primary">
          <i className="bi bi-plus-lg me-2"></i>
          Add Product
        </button>
      </div>


      {/* Statistics */}
      <div className="row g-4">

        {/* Orders */}
        <div className="col-xl-3 col-md-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body d-flex justify-content-between">

              <div>
                <p className="text-muted mb-2">
                  Total Orders
                </p>

                <h3 className="fw-bold">
                  1,248
                </h3>

                <small className="text-success">
                  +12% this month
                </small>
              </div>

              <div className="fs-1 text-primary">
                <i className="bi bi-cart3"></i>
              </div>

            </div>
          </div>
        </div>


        {/* Products */}
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
                  +8 new products
                </small>
              </div>

              <div className="fs-1 text-primary">
                <i className="bi bi-box-seam"></i>
              </div>

            </div>
          </div>
        </div>


        {/* Customers */}
        <div className="col-xl-3 col-md-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body d-flex justify-content-between">

              <div>
                <p className="text-muted mb-2">
                  Total Customers
                </p>

                <h3 className="fw-bold">
                  8,542
                </h3>

                <small className="text-success">
                  +18% this month
                </small>
              </div>

              <div className="fs-1 text-primary">
                <i className="bi bi-people"></i>
              </div>

            </div>
          </div>
        </div>


        {/* Revenue */}
        <div className="col-xl-3 col-md-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body d-flex justify-content-between">

              <div>
                <p className="text-muted mb-2">
                  Total Revenue
                </p>

                <h3 className="fw-bold">
                  ₹4.8L
                </h3>

                <small className="text-success">
                  +15% this month
                </small>
              </div>

              <div className="fs-1 text-primary">
                <i className="bi bi-currency-rupee"></i>
              </div>

            </div>
          </div>
        </div>

      </div>


      {/* Recent Orders */}
      <div className="card border-0 shadow-sm mt-4">

        <div className="card-body">

          <div className="d-flex justify-content-between align-items-center mb-3">

            <h5 className="fw-bold mb-0">
              Recent Orders
            </h5>

            <button className="btn btn-outline-primary btn-sm">
              View All
            </button>

          </div>


          <div className="table-responsive">

            <table className="table table-hover align-middle">

              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>

                <tr>
                  <td>#ORD-1001</td>
                  <td>Ravi Kumar</td>
                  <td>₹2,499</td>
                  <td>
                    <span className="badge bg-success">
                      Completed
                    </span>
                  </td>
                </tr>

                <tr>
                  <td>#ORD-1002</td>
                  <td>Arun Kumar</td>
                  <td>₹1,899</td>
                  <td>
                    <span className="badge bg-warning text-dark">
                      Pending
                    </span>
                  </td>
                </tr>

                <tr>
                  <td>#ORD-1003</td>
                  <td>Vijay Raj</td>
                  <td>₹3,299</td>
                  <td>
                    <span className="badge bg-info">
                      Processing
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