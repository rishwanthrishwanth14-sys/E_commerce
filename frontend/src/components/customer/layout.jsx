const CustomerLayout = () => {
  return (
    <div className="customer-layout">

      <CustomerSidebar />

      <div
        className="flex-grow-1 customer-main-area"
      >
        <Navbar />

        <main className="customer-main-content">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default CustomerLayout;