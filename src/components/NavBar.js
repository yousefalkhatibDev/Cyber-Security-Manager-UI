import React from "react";
import { Link } from "react-router-dom";
import { FiLogOut, FiTarget } from "react-icons/fi";
import { MdOutlinePerson, MdDashboard } from "react-icons/md";
import { GrSettingsOption } from "react-icons/gr"
import Dropdown from 'react-bootstrap/Dropdown';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem
} from "cdbreact";
import { NavLink } from "react-router-dom";

import API from "../helper/API";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLinksActive: false,
      isOpened: true,
      coolDown: false,
      UserImage: "",
      UserName: ""
    };
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

  handleDrawerOpen() {
    if (this.state.coolDown === true) {
      return;
    }
    this.setState({ isOpened: !this.state.isOpened, coolDown: true })
    setTimeout(() => { this.setState({ coolDown: false }) }, 300)
  }

  render() {
    return (
      <>
        <div
          className="sideBar-container"
        >
          <CDBSidebar textColor="#202020" backgroundColor="rgb(255, 255, 255)">
            <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large" onClick={this.handleDrawerOpen} style={{ color: "rgb(10, 10, 10)" }}></i>}>
              <a
                href="/dashboard"
                className="text-decoration-none"
                style={{ color: "inherit" }}
              >
                Sidebar
              </a>
            </CDBSidebarHeader>

            <CDBSidebarFooter style={{ textAlign: "center" }}>
              {/* <div
                className="sidebar-btn-wrapper"
                style={{
                  padding: "20px 5px"
                }}
              >
                Sidebar Footer
              </div> */}
              <div className={this.state.isOpened ? "sideBar-footer" : "sideBar-footer sideBar-footer-closed"}>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive ? "sideBar-active" : undefined
                  }
                >
                  <MdDashboard
                    color="black"
                    size={"20"}
                    textDecoration="none"
                  />
                  <span>Dashboard</span>
                </NavLink>
                <NavLink
                  to="/operations"
                  className={({ isActive }) =>
                    isActive ? "sideBar-active" : undefined
                  }
                >
                  <GrSettingsOption
                    color="black"
                    size={"20"}
                    textDecoration="none"
                  />
                  <span>Operations</span>
                </NavLink>
                <NavLink
                  to="/targets"
                  className={({ isActive }) =>
                    isActive ? "sideBar-active" : undefined
                  }
                >
                  <FiTarget
                    color="black"
                    size={"20"}
                    textDecoration="none"
                  />
                  <span>Targets</span>
                </NavLink>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    isActive ? "sideBar-active" : undefined
                  }
                >
                  <MdOutlinePerson
                    color="black"
                    size={"20"}
                    textDecoration="none"
                  />
                  <span>profile</span>
                </NavLink>
                <NavLink onClick={this.Logout} >
                  <FiLogOut
                    color="black"
                    size={"20"}
                    textDecoration="none"
                  />
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
