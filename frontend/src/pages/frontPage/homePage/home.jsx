import { useNavigate } from "react-router-dom";
import "./home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg home-navbar">
        <div className="container py-2">

          <a className="navbar-brand fw-bold" href="/">
            <i className="bi bi-bag-fill text-primary me-2"></i>
            ShopHub
          </a>

          <div className="d-flex align-items-center gap-2">

            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => navigate("/customer/login")}
            >
              Customer Sign In
            </button>

            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate("/admin/login")}
            >
              Admin Sign In
            </button>

          </div>

        </div>
      </nav>


      {/* Hero Section */}
      <section className="home-hero">

        <div className="container">

          <div className="row align-items-center home-hero-row">

            {/* Left Content */}
            <div className="col-lg-6 mb-5 mb-lg-0">

              <span className="home-badge">
                Welcome to ShopHub
              </span>

              <h1 className="home-title">
                Everything You Need,
                <span className="text-primary">
                  {" "}All in One Place.
                </span>
              </h1>

              <p className="home-description">
                Discover quality products, manage your orders,
                and enjoy a simple shopping experience with ShopHub.
              </p>

              <div className="home-hero-buttons">

                <button
                  type="button"
                  className="btn btn-primary btn-lg px-4"
                  onClick={() => navigate("/customer/register")}
                >
                  Start Shopping
                </button>

                <button
                  type="button"
                  className="btn btn-outline-secondary btn-lg px-4"
                  onClick={() => navigate("/customer/login")}
                >
                  Sign In
                </button>

              </div>

            </div>


            {/* Right Content */}
            <div className="col-lg-6">

              <div className="card home-main-card">

                <div className="card-body">

                  <div className="row g-3">

                    {/* Customer */}
                    <div className="col-12">

                      <div className="card home-role-card">

                        <div className="card-body">

                          <div className="d-flex align-items-center mb-3">

                            <div className="home-role-icon bg-primary text-white me-3">
                              <i className="bi bi-person"></i>
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
                              type="button"
                              className="btn btn-primary flex-grow-1"
                              onClick={() =>
                                navigate("/customer/login")
                              }
                            >
                              Sign In
                            </button>

                            <button
                              type="button"
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

                      <div className="card home-role-card">

                        <div className="card-body">

                          <div className="d-flex align-items-center mb-3">

                            <div className="home-role-icon bg-dark text-white me-3">
                              <i className="bi bi-shield-lock"></i>
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
                            type="button"
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
      <footer className="home-footer">

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