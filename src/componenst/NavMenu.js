import React from "react";
import { Link } from "react-router-dom";
import { NavMenuData } from "./NavMenuData";

class NavMenu extends React.Component {
  render() {
    return (
      <ul className="small-menu-inside-main">
        {NavMenuData.map((item, index) => {
          return (
            <li key={index} className={item.cName}>
              <Link to={item.path}>{item.icon}</Link>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default NavMenu;
