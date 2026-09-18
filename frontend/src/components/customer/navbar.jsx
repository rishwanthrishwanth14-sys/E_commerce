const CustomerNavbar = () => {

  return (
    <nav className="navbar navbar-light bg-white border-bottom px-4 py-3">

      <div>
        <h5 className="mb-0">
          Customer Panel
        </h5>
      </div>

      <div className="d-flex align-items-center gap-3">

        <span>
          <i className="bi bi-person-circle fs-4"></i>
        </span>

        <div>
          <small className="text-muted d-block">
            Welcome
          </small>

          <strong>
            Rishwanth
          </strong>
        </div>

      </div>

    </nav>
  );
};

export default CustomerNavbar;