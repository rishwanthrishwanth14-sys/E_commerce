const CustomerDashboard = () => {

  const stats = [
    {
      title: "Total Orders",
      value: 12,
      icon: "bi-box-seam"
    },
    {
      title: "Pending Orders",
      value: 2,
      icon: "bi-clock"
    },
    {
      title: "Completed Orders",
      value: 8,
      icon: "bi-check-circle"
    },
    {
      title: "Total Spent",
      value: "₹25,500",
      icon: "bi-currency-rupee"
    }
  ];

  const recentOrders = [
    {
      id: "ORD1001",
      date: "06 Sep 2026",
      amount: "₹2,500",
      payment: "Paid",
      status: "Delivered"
    },
    {
      id: "ORD1002",
      date: "04 Sep 2026",
      amount: "₹1,200",
      payment: "Pending",
      status: "Processing"
    },
    {
      id: "ORD1003",
      date: "01 Sep 2026",
      amount: "₹3,500",
      payment: "Paid",
      status: "Shipped"
    }
  ];

  return (
    <div>

      {/* Header */}

      <div className="mb-4">

        <h3>
          Welcome back, Rishwanth
        </h3>

        <p className="text-muted">
          Here's what's happening with your account.
        </p>

      </div>


      {/* Statistics */}

      <div className="row g-4 mb-4">

        {stats.map((stat) => (

          <div
            className="col-md-6 col-xl-3"
            key={stat.title}
          >

            <div className="card border-0 shadow-sm h-100">

              <div className="card-body">

                <div className="d-flex justify-content-between align-items-center">

                  <div>

                    <p className="text-muted mb-2">
                      {stat.title}
                    </p>

                    <h3 className="mb-0">
                      {stat.value}
                    </h3>

                  </div>

                  <div>
                    <i
                      className={`bi ${stat.icon} fs-1 text-primary`}
                    ></i>
                  </div>

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>


      {/* Recent Orders */}

      <div className="card border-0 shadow-sm">

        <div className="card-header bg-white py-3">

          <div className="d-flex justify-content-between">

            <h5 className="mb-0">
              Recent Orders
            </h5>

            <a
              href="/customer/orders"
              className="text-decoration-none"
            >
              View All
            </a>

          </div>

        </div>


        <div className="card-body p-0">

          <div className="table-responsive">

            <table className="table table-hover mb-0">

              <thead className="table-light">

                <tr>
                  <th>Order</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>

              </thead>

              <tbody>

                {recentOrders.map((order) => (

                  <tr key={order.id}>

                    <td>
                      <strong>
                        #{order.id}
                      </strong>
                    </td>

                    <td>
                      {order.date}
                    </td>

                    <td>
                      {order.amount}
                    </td>

                    <td>

                      <span
                        className={`badge ${
                          order.payment === "Paid"
                            ? "text-bg-success"
                            : "text-bg-warning"
                        }`}
                      >
                        {order.payment}
                      </span>

                    </td>

                    <td>

                      <span className="badge text-bg-info">
                        {order.status}
                      </span>

                    </td>

                    <td>

                      <button className="btn btn-sm btn-outline-primary">
                        View
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>


      {/* Account Information */}

      <div className="row g-4 mt-2">

        <div className="col-md-6">

          <div className="card border-0 shadow-sm">

            <div className="card-header bg-white">

              <h5 className="mb-0">
                Account Information
              </h5>

            </div>

            <div className="card-body">

              <p>
                <strong>Name:</strong>{" "}
                Rishwanth
              </p>

              <p>
                <strong>Email:</strong>{" "}
                rishwanth@example.com
              </p>

              <p>
                <strong>Phone:</strong>{" "}
                +91 9876543210
              </p>

              <button className="btn btn-primary">
                Edit Profile
              </button>

            </div>

          </div>

        </div>


        <div className="col-md-6">

          <div className="card border-0 shadow-sm">

            <div className="card-header bg-white">

              <h5 className="mb-0">
                My Address
              </h5>

            </div>

            <div className="card-body">

              <p className="mb-1">
                <strong>
                  Rishwanth
                </strong>
              </p>

              <p className="text-muted">
                123, Main Street,
                <br />
                Tirupur,
                <br />
                Tamil Nadu - 641601,
                <br />
                India
              </p>

              <button className="btn btn-outline-primary">
                Manage Addresses
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default CustomerDashboard;