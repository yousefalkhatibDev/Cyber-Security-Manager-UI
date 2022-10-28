import React from "react";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { MdOutlinePerson } from "react-icons/md";
import Dropdown from "react-bootstrap/Dropdown";

import API from "../helper/API";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLinksActive: false,
      UserImage: "",
      UserName: ""
    };
    this.Logout = this.Logout.bind(this);
    this.HandleHamClick = this.HandleHamClick.bind(this);
    this.HandleOnScroll = this.HandleOnScroll.bind(this);
    this.GetUserInfo = this.GetUserInfo.bind(this);
  }

  async GetUserInfo() {
    const data = {
      Token: window.sessionStorage.getItem("token"),
    };

    await API.post("/get_user_info", data)
      .then((respone) => {
        const res = respone.data;

        if (res.ErrorMessage) {
          window.alert(res.ErrorMessage);
        }

        if (res.data) {
          this.setState({
            UserImage: res.data.u_image,
            UserName: res.data.u_name
          })
        }
      })
      .catch(function (error) {
        console.error(error);
      });
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

  componentDidMount() {
    this.GetUserInfo()
    window.addEventListener("scroll", this.HandleOnScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.HandleOnScroll);
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
                      src={this.state.UserImage}
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
                <p>{this.state.UserName}</p>
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
          </div>
        </nav>
      </>
    );
  }
}

export default NavBar;
