import React from "react";
import { Link } from "react-router-dom";
import "./../style/custom.css";
import { SideBarData } from "../componenst/SideBarData";

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
    };
  }
  render() {
    return (
      <>
        <nav className="side-bar">
          <ul className="side-bar-items">
            {SideBarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>{item.icon}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </>
    );
  }
}

export default SideBar;
