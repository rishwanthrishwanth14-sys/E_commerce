const CustomerProfile = () => {

  return (
    <div>

      <h3 className="mb-4">
        My Profile
      </h3>

      <div className="card border-0 shadow-sm">

        <div className="card-body">

          <form>

            <div className="row g-3">

              <div className="col-md-6">

                <label className="form-label">
                  First Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  defaultValue="Rishwanth"
                />

              </div>


              <div className="col-md-6">

                <label className="form-label">
                  Last Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  defaultValue="R"
                />

              </div>


              <div className="col-md-6">

                <label className="form-label">
                  Email
                </label>

                <input
                  type="email"
                  className="form-control"
                  defaultValue="rishwanth@example.com"
                />

              </div>


              <div className="col-md-6">

                <label className="form-label">
                  Phone
                </label>

                <input
                  type="text"
                  className="form-control"
                  defaultValue="+91 9876543210"
                />

              </div>


              <div className="col-12">

                <button className="btn btn-primary">
                  Update Profile
                </button>

              </div>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
};

export default CustomerProfile;