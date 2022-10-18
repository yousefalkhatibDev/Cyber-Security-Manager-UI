import React from "react";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { MdOutlinePerson } from "react-icons/md";
import Dropdown from "react-bootstrap/Dropdown";

import API from "../helper/API";

class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLinksActive: false,
    };
    this.Logout = this.Logout.bind(this);
    this.HandleHamClick = this.HandleHamClick.bind(this);
    this.HandleOnScroll = this.HandleOnScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.HandleOnScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.HandleOnScroll);
  }

  async Logout() {
    const data = {
      Token: window.sessionStorage.getItem("token"),
    };

    await API.post("/logout", data)
      .then((respone) => {
        const res = respone.data;

        if (res.ErrorMessage) {
          window.alert(res.ErrorMessage);
        }

        if (res.data) {
          window.sessionStorage.removeItem("token");
          window.location = "/login";
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  HandleHamClick() {
    const currentState = this.state.isLinksActive;
    this.setState({ isLinksActive: !currentState });
  }

  HandleOnScroll() {
    this.setState({ isLinksActive: false });
  }
  render() {
    return (
      <>
        <nav className="NavBar">
          <div>
            <div className="user-card">
              <div className="user-name">
                <Dropdown>
                  <Dropdown.Toggle
                    variant="success"
                    id="dropdown-basic"
                    style={{ border: "none", backgroundColor: "transparent" }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
                      alt="user-card"
                      className="user-img-top-bar"
                    />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="/profile">
                      <Link to="/profile" style={{ textDecoration: "none" }}>
                        <span style={{ marginRight: "25px", color: "black" }}>
                          My Profile
                        </span>{" "}
                        <MdOutlinePerson
                          color="black"
                          size={"13"}
                          textDecoration="none"
                        />
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item onClick={this.Logout}>
                      <span style={{ marginRight: "50px" }}>Logout</span>{" "}
                      <FiLogOut
                        color="black"
                        size={"13"}
                        textDecoration="none"
                      />
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <p>Ahmad almuhidat</p>
              </div>
            </div>

            <ul
              className={
                this.state.isLinksActive
                  ? "nav-menu nav-links navActive"
                  : "nav-menu nav-links"
              }
            >
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
          </div>
          <div>
            <ul className="nav-ham-container">
              <div className="ham" onClick={this.HandleHamClick}>
                <div className="line1"></div>
                <div className="line2"></div>
                <div className="line3"></div>
              </div>
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
          </div>
        </nav>
      </>
    );
  }
}

export default TopBar;
