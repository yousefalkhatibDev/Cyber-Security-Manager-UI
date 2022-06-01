import React from "react";
import { Link } from "react-router-dom";

class TargetCard extends React.Component {
  render() {
    return (
      <div className="target-card-container">
        <div className="summary target-card">
          <img
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
            alt="user-card"
            className="target-img"
          />
          <p>John smith</p>
          <p>Opertion: black hat</p>

          <Link to="/" className="btn_profile">
            Report
          </Link>
        </div>
      </div>
    );
  }
}

export default TargetCard;
