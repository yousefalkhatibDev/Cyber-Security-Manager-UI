import React from "react";
import reconLogo from "../imgs/recon-logo.png"
import dashboardIcon from "../icons/dashboard-fill.svg"
import operationIcon from "../icons/operation.svg"
import targetIcon from "../icons/target.svg"
import logoutIcon from "../icons/Logout.svg"
import profileIcon from "../icons/profile.svg"
import {
  CDBSidebar,
  CDBSidebarFooter,
  CDBSidebarHeader,
} from "cdbreact";
import { NavLink } from "react-router-dom";

import API from "../helper/API";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLinksActive: false,
      isOpened: true,
      allowClose: false,
      wasClosed: false,
      UserImage: "",
      UserName: ""
    };
    this.sideBarRef = React.createRef()
    this.Logout = this.Logout.bind(this);
    this.GetUserInfo = this.GetUserInfo.bind(this);
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this)
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

  componentDidMount() {
    if (window.innerWidth <= 920 && !this.state.allowClose === true) {
      this.setState({ allowClose: true })
    } else if (window.innerWidth > 920 && !this.state.allowClose === false) {
      if (this.state.isOpened === false) {
        this.setState({ allowClose: false, isOpened: true })
      } else {
        this.setState({ allowClose: false })
      }
    }
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 920 && !this.state.allowClose === true) {
        if (!this.state.wasClosed) {
          this.setState({ allowClose: true, isOpened: true })
        } else {
          this.setState({ allowClose: true, isOpened: false })
        }
      } else if (window.innerWidth > 920 && !this.state.allowClose === false) {
        if (this.state.isOpened === false) {
          this.setState({ allowClose: false, isOpened: true, wasClosed: true })
        } else {
          this.setState({ allowClose: false, wasClosed: false })
        }
      }
    })
  }

  handleDrawerOpen() {
    if (this.sideBarRef.current.getBoundingClientRect().width === 270) {
      this.setState({ isOpened: false })
    } else {
      this.setState({ isOpened: true })
    }
  }

  render() {
    return (
      <>
        <div
          className={this.state.allowClose ? "sideBar-container" : "sideBar-container sideBar-container-Open"}
        >
          <CDBSidebar textColor="#202020" backgroundColor="rgb(255, 255, 255)" ref={this.sideBarRef}>
            {
              this.state.allowClose === true
              &&
              (
                <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large" onClick={this.handleDrawerOpen} style={{ color: "rgb(10, 10, 10)" }}></i>}>
                </CDBSidebarHeader>
              )
            }
            <CDBSidebarFooter style={{ textAlign: "center" }} >
              <img className="sideBar-logo" src={reconLogo} alt=""
                style={{
                  objectFit: this.state.isOpened ? "contain" : "cover",
                  height: this.state.isOpened ? "100px" : "50px",
                  marginTop: this.state.allowClose ? "10px" : "70px"
                }}
              />
              <div className={this.state.isOpened ? "sideBar-footer" : "sideBar-footer sideBar-footer-closed"}>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive ? "sideBar-active" : undefined
                  }
                >
                  <img src={dashboardIcon} style={{ width: "22px" }} alt="" />
                  <span>Dashboard</span>
                </NavLink>
                <NavLink
                  to="/operations"
                  className={({ isActive }) =>
                    isActive ? "sideBar-active" : undefined
                  }
                >
                  <img src={operationIcon} style={{ width: "22px" }} alt="" />
                  <span>Operations</span>
                </NavLink>
                <NavLink
                  to="/targets"
                  className={({ isActive }) =>
                    isActive ? "sideBar-active" : undefined
                  }
                >
                  <img src={targetIcon} style={{ width: "22px" }} alt="" />
                  <span>Targets</span>
                </NavLink>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    isActive ? "sideBar-active" : undefined
                  }
                >
                  <img src={profileIcon} style={{ width: "22px" }} alt="" />
                  <span>profile</span>
                </NavLink>
                <NavLink onClick={this.Logout} >
                  <img src={logoutIcon} style={{ width: "22px" }} alt="" />
                  <span>logout</span>
                </NavLink>
              </div>
            </CDBSidebarFooter>
          </CDBSidebar>
        </div >
      </>
    );
  }
}

export default NavBar;
