import { useEffect, useState } from "react";
import { getMyProfile } from "../../service/adminService";

function Header() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const result = await getMyProfile();
        setProfile(result.data || null);
      } catch {
        setProfile(null);
      }
    };

    loadProfile();
  }, []);

  const adminName = [profile?.firstname, profile?.lastname]
    .filter(Boolean)
    .join(" ") || "Admin";

  const adminInitial = adminName.charAt(0).toUpperCase();

  return (
    <header className="header">
      <div className="header-logo">
        <i className="bi bi-bag-check-fill"></i>
        <span>ShopAdmin</span>
      </div>

      <div className="header-search">
        <i className="bi bi-search"></i>
        <input type="text" placeholder="Search..." />
      </div>

      <div className="header-right">
        <button type="button" className="header-icon">
          <i className="bi bi-bell"></i>
          <span className="notification-dot"></span>
        </button>

        <div className="profile">
          <div className="profile-image">
            {adminInitial}
          </div>

          <div className="profile-info">
            <span className="profile-name">
              {adminName}
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
