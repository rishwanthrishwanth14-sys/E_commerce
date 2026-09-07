import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-vh-100 bg-light">

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg bg-white border-bottom">
        <div className="container py-2">

          <a className="navbar-brand fw-bold fs-4" href="/">
            <i className="bi bi-bag-fill text-primary me-2"></i>
            ShopHub
          </a>

          <div className="d-flex align-items-center gap-2">
            <button
              className="btn btn-outline-primary"
              onClick={() => navigate("/customer/login")}
            >
              Customer Sign In
            </button>

            <button
              className="btn btn-primary"
              onClick={() => navigate("/admin/login")}
            >
              Admin Sign In
            </button>
          </div>

        </div>
      </nav>


      {/* Hero Section */}
      <section className="py-5">
        <div className="container">

          <div className="row align-items-center min-vh-75">

            {/* Left */}
            <div className="col-lg-6 mb-5 mb-lg-0">

              <span className="badge bg-primary-subtle text-primary px-3 py-2 mb-3">
                Welcome to ShopHub
              </span>

              <h1 className="display-4 fw-bold mb-3">
                Everything You Need,
                <span className="text-primary"> All in One Place.</span>
              </h1>

              <p className="lead text-secondary mb-4">
                Discover quality products, manage your orders,
                and enjoy a simple shopping experience with ShopHub.
              </p>

              <button
                className="btn btn-primary btn-lg px-4 me-2"
                onClick={() => navigate("/customer/signup")}
              >
                Start Shopping
              </button>

              <button
                className="btn btn-outline-secondary btn-lg px-4"
                onClick={() => navigate("/customer/login")}
              >
                Sign In
              </button>

            </div>


            {/* Right */}
            <div className="col-lg-6">

              <div className="card border-0 shadow-lg rounded-4">
                <div className="card-body p-4">

                  <div className="row g-3">

                    {/* Customer */}
                    <div className="col-12">

                      <div className="card border rounded-4">
                        <div className="card-body p-4">

                          <div className="d-flex align-items-center mb-3">

                            <div
                              className="bg-primary text-white rounded-3 d-flex align-items-center justify-content-center me-3"
                              style={{
                                width: "50px",
                                height: "50px"
                              }}
                            >
                              <i className="bi bi-person fs-4"></i>
                            </div>

                            <div>
                              <h4 className="fw-bold mb-1">
                                Customer
                              </h4>

                              <small className="text-muted">
                                Shop products and manage your orders
                              </small>
                            </div>

                          </div>

                          <div className="d-flex gap-2">

                            <button
                              className="btn btn-primary flex-grow-1"
                              onClick={() =>
                                navigate("/customer/login")
                              }
                            >
                              Sign In
                            </button>

                            <button
                              className="btn btn-outline-primary flex-grow-1"
                              onClick={() =>
                                navigate("/customer/register")
                              }
                            >
                              Sign Up
                            </button>

                          </div>

                        </div>
                      </div>

                    </div>


                    {/* Admin */}
                    <div className="col-12">

                      <div className="card border rounded-4">
                        <div className="card-body p-4">

                          <div className="d-flex align-items-center mb-3">

                            <div
                              className="bg-dark text-white rounded-3 d-flex align-items-center justify-content-center me-3"
                              style={{
                                width: "50px",
                                height: "50px"
                              }}
                            >
                              <i className="bi bi-shield-lock fs-4"></i>
                            </div>

                            <div>
                              <h4 className="fw-bold mb-1">
                                Admin
                              </h4>

                              <small className="text-muted">
                                Manage products, orders and customers
                              </small>
                            </div>

                          </div>

                          <button
                            className="btn btn-dark w-100"
                            onClick={() =>
                              navigate("/admin/login")
                            }
                          >
                            <i className="bi bi-box-arrow-in-right me-2"></i>
                            Admin Sign In
                          </button>

                        </div>
                      </div>

                    </div>

                  </div>

                </div>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* Footer */}
      <footer className="bg-white border-top py-4">
        <div className="container text-center">

          <small className="text-muted">
            © 2026 ShopHub. All rights reserved.
          </small>

        </div>
      </footer>

    </div>
  );
};

export default Home;