
import { NavLink } from "react-router-dom";

const CustomerSidebar = () => {

  const menuItems = [
    {
      name: "Dashboard",
      path: "/customer/dashboard",
      icon: "bi-grid"
    },
    {
      name: "My Orders",
      path: "/customer/orders",
      icon: "bi-bag"
    },
    {
      name: "My Profile",
      path: "/customer/profile",
      icon: "bi-person"
    },
    {
      name: "Addresses",
      path: "/customer/addresses",
      icon: "bi-geo-alt"
    },
    {
      name: "Shop",
      path: "/customer/shop",
      icon: "bi-shop"
    }
  ];

  return (
    <aside
      className="bg-white border-end vh-100 d-flex flex-column p-3"
      style={{ width: "260px" }}
    >

      {/* Brand */}
      <div className="px-2 py-3 mb-4">

        <div className="d-flex align-items-center gap-2">

          <div
            className="bg-primary text-white rounded-3 d-flex align-items-center justify-content-center"
            style={{ width: "42px", height: "42px" }}
          >
            <i className="bi bi-bag-fill fs-5"></i>
          </div>

          <div>
            <h5 className="fw-bold mb-0">
              ShopHub
            </h5>

            <small className="text-muted">
              Customer Panel
            </small>
          </div>

        </div>

      </div>


      {/* Menu Title */}
      <small className="text-uppercase text-muted fw-semibold px-2 mb-2">
        Menu
      </small>


      {/* Navigation */}
      <nav className="d-flex flex-column gap-1">

        {menuItems.map((item) => (

          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `text-decoration-none rounded-3 px-3 py-3 d-flex align-items-center gap-3 ${
                isActive
                  ? "bg-primary text-white shadow-sm"
                  : "text-secondary"
              }`
            }
          >

            <i className={`bi ${item.icon} fs-5`}></i>

            <span className="fw-medium">
              {item.name}
            </span>

          </NavLink>

        ))}

      </nav>


      {/* Spacer */}
      <div className="flex-grow-1"></div>


      {/* Customer Profile */}
      <div className="border-top pt-3">

        <div className="d-flex align-items-center gap-2 px-2 mb-3">

          <div
            className="bg-light rounded-circle d-flex align-items-center justify-content-center"
            style={{ width: "42px", height: "42px" }}
          >
            <i className="bi bi-person fs-5 text-secondary"></i>
          </div>

          <div className="overflow-hidden">

            <div className="fw-semibold text-dark">
              Rishwanth
            </div>

            <small className="text-muted">
              Customer
            </small>

          </div>

        </div>


        {/* Logout */}
        <button
          type="button"
          className="btn btn-light w-100 text-danger d-flex align-items-center gap-3 px-3 py-2"
        >

          <i className="bi bi-box-arrow-left"></i>

          <span>
            Sign Out
          </span>

        </button>

      </div>

    </aside>
  );
};

export default CustomerSidebar;

