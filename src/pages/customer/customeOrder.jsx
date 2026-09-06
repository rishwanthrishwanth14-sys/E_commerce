const CustomerOrders = () => {

  const orders = [
    {
      id: "ORD1001",
      date: "06 Sep 2026",
      total: "₹2,500",
      payment: "Paid",
      status: "Delivered"
    },
    {
      id: "ORD1002",
      date: "04 Sep 2026",
      total: "₹1,200",
      payment: "Pending",
      status: "Processing"
    },
    {
      id: "ORD1003",
      date: "01 Sep 2026",
      total: "₹3,500",
      payment: "Paid",
      status: "Shipped"
    }
  ];

  return (
    <div>

      <h3 className="mb-4">
        My Orders
      </h3>

      <div className="card border-0 shadow-sm">

        <div className="card-body">

          <div className="table-responsive">

            <table className="table table-hover">

              <thead>

                <tr>
                  <th>Order Number</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>

              </thead>

              <tbody>

                {orders.map((order) => (

                  <tr key={order.id}>

                    <td>
                      #{order.id}
                    </td>

                    <td>
                      {order.date}
                    </td>

                    <td>
                      {order.total}
                    </td>

                    <td>
                      <span className="badge text-bg-success">
                        {order.payment}
                      </span>
                    </td>

                    <td>
                      <span className="badge text-bg-info">
                        {order.status}
                      </span>
                    </td>

                    <td>
                      <button className="btn btn-sm btn-primary">
                        View Details
                      </button>
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
};

export default CustomerOrders;