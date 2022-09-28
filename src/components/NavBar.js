import React from "react";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

import API from "../helper/API";

class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.Logout = this.Logout.bind(this);
  }

  async Logout() {
    const data = {
      Token: window.sessionStorage.getItem("token"),
    };

    await API.post("/logout", data)
      .then((respone) => {
        const res = respone.data;
        if (res.data) {
          window.sessionStorage.removeItem("token");
          window.location = "/login";
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  render() {
    return (
      <>
        <nav className="NavBar">
          {window.location.pathname === "/login" ? null : (
            <>
              <div className="user-card">
                <img
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
                  alt="user-card"
                  className="user-img-top-bar"
                />
                <div className="user-name">
                  <p>Ahmad almuhidat</p>
                </div>
              </div>
              <ul className="nav-menu">
                <Link to="/" className="option">
                  Dashboard
                </Link>
                <Link to="/operations" className="option">
                  Operations
                </Link>
                <Link to="targets" className="option">
                  Targets
                </Link>
              </ul>
              <ul className="nav-menu" style={{ float: "right" }}>
                <li>
                  <Link to="#">
                    <FiLogOut
                      color="white"
                      size={"23"}
                      textDecoration="none"
                      onClick={this.Logout}
                    />
                  </Link>
                </li>
              </ul>
            </>
          )}
        </nav>
      </>
    );
  }
}

export default TopBar;
