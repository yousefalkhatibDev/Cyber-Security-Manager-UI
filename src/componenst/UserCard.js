import React from "react";

class UserCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="user-card">
        <img
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
          alt="user-card"
          className="user-img-top-bar"
        />
        <div className="user-name">
          <p>
            Ahmad almuhidat
            <br />
            Admin
          </p>
        </div>
      </div>
    );
  }
}

export default UserCard;
