import React from "react";

// components
import ProfileSlider from "../componenst/profileSlider";

class Profile extends React.Component {
  render() {
    return (
      <div className="profile">
        <div
          style={{
            display: "flex",
            backgroundColor: "#111927",
            padding: "20px",
          }}
        >
          <div>
            <img
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
              alt="user-card"
              className="profile-img"
            />
          </div>

          <div
            className="profile-info"
            style={{
              width: "77%",
              padding: "0px 15px",
            }}
          >
            <p>First Name</p>
            <p>here goes the bio about the user</p>
          </div>
        </div>

        <div>
          <ProfileSlider />
        </div>
      </div>
    );
  }
}

export default Profile;
