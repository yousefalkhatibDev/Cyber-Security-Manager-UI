import React from "react";

// styles
import "./../style/custom.css";

// components
import UserCard from "./../componenst/UserCard";
import SmallMenu from "./../componenst/SmallMenu";
import NavMenu from "../componenst/NavMenu";

class TopBar extends React.Component {
  render() {
    return (
      <>
        <nav className="top-bar">
          <UserCard />
          <NavMenu />
          <SmallMenu />
        </nav>
      </>
    );
  }
}

export default TopBar;
