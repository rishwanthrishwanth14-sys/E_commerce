function Header() {
  return (
    <header className="header">

      {/* Logo */}
      <div className="header-logo">
        <i className="bi bi-bag-check-fill"></i>
        <span>ShopAdmin</span>
      </div>

      {/* Search */}
      <div className="header-search">
        <i className="bi bi-search"></i>

        <input
          type="text"
          placeholder="Search..."
        />
      </div>

      {/* Right Side */}
      <div className="header-right">

        {/* Notification */}
        <button className="header-icon">
          <i className="bi bi-bell"></i>
          <span className="notification-dot"></span>
        </button>

        {/* Profile */}
        <div className="profile">
          <div className="profile-image">
            A
          </div>

          <div className="profile-info">
            <span className="profile-name">
              Admin
            </span>

            <span className="profile-role">
              Administrator
            </span>
          </div>

          <i className="bi bi-chevron-down"></i>
        </div>

      </div>

    </header>
  );
}

export default Header;