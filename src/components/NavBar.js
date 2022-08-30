import React from "react";
import { Link } from "react-router-dom";
import * as FiIcons from "react-icons/fi";

// styles
import "./../style/custom.css";

class TopBar extends React.Component {
  render() {
    return (
      <>
        <nav className="NavBar">
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

          {/* <ul className="nav-menu" style={{ float: "right" }}>
            <li>
              <Link to="#">
                <FiIcons.FiMail color="white" textDecoration="none" />
              </Link>
            </li>
          </ul> */}
        </nav>
      </>
    );
  }
}

export default TopBar;
