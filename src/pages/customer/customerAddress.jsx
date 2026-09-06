const CustomerAddresses = () => {

  const addresses = [
    {
      id: 1,
      name: "Rishwanth R",
      address: "123, Main Street",
      city: "Tirupur",
      state: "Tamil Nadu",
      postcode: "641601",
      country: "India",
      phone: "+91 9876543210"
    }
  ];

  return (
    <div>

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h3>
          My Addresses
        </h3>

        <button className="btn btn-primary">
          <i className="bi bi-plus-lg me-2"></i>
          Add Address
        </button>

      </div>


      <div className="row g-4">

        {addresses.map((address) => (

          <div
            className="col-md-6"
            key={address.id}
          >

            <div className="card border-0 shadow-sm">

              <div className="card-body">

                <h5>
                  {address.name}
                </h5>

                <p className="text-muted mb-1">
                  {address.address}
                </p>

                <p className="text-muted mb-1">
                  {address.city}, {address.state}
                </p>

                <p className="text-muted mb-1">
                  {address.postcode}
                </p>

                <p className="text-muted">
                  {address.country}
                </p>

                <p>
                  <strong>
                    Phone:
                  </strong>{" "}
                  {address.phone}
                </p>


                <div className="d-flex gap-2">

                  <button className="btn btn-outline-primary btn-sm">
                    Edit
                  </button>

                  <button className="btn btn-outline-danger btn-sm">
                    Delete
                  </button>

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default CustomerAddresses;