const CustomerShop = () => {

  const products = [
    {
      id: 1,
      name: "Running Shoes",
      price: "₹2,500",
      image: "https://via.placeholder.com/300"
    },
    {
      id: 2,
      name: "Sports T-Shirt",
      price: "₹1,200",
      image: "https://via.placeholder.com/300"
    },
    {
      id: 3,
      name: "Football",
      price: "₹1,500",
      image: "https://via.placeholder.com/300"
    }
  ];

  return (
    <div>

      <h3 className="mb-4">
        Shop Products
      </h3>

      <div className="row g-4">

        {products.map((product) => (

          <div
            className="col-md-6 col-lg-4"
            key={product.id}
          >

            <div className="card h-100 border-0 shadow-sm">

              <img
                src={product.image}
                className="card-img-top"
                alt={product.name}
              />

              <div className="card-body">

                <h5>
                  {product.name}
                </h5>

                <h6 className="mb-3">
                  {product.price}
                </h6>

                <button className="btn btn-primary w-100">
                  View Product
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default CustomerShop;