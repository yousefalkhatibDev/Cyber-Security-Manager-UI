import React from "react";
import { Link } from "react-router-dom";
import * as FiIcons from "react-icons/fi";

class SmallMenu extends React.Component {
  render() {
    return (
      <ul className="small-menu-inside-main">
        <li>
          <Link to="#">
            <FiIcons.FiMail />
          </Link>
        </li>
      </ul>
    );
  }
}

export default SmallMenu;
