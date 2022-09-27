import React from "react";

class OperationCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      members: 5,
      targets: 5,
      posts: 5,
    };
  }

  render() {
    return (
      <div className="OperationCardContainer">
        <div
          className="OperationImg ConstRadius"
          style={{ position: "relative" }}
        >
          <img
            src="https://img.freepik.com/free-vector/neon-cyber-security-concept-with-padlock-circuit_23-2148536303.jpg?w=900&t=st=1660930843~exp=1660931443~hmac=efcef9e6d44df72e8f8d1f679f29b28823bd0313b2a61eefecbda97b8622878d"
            alt="vector"
          />

          <h2 className="OperationCard-name" >
            {this.props.name}
          </h2>
        </div>

        <div className="OperationDescription">
          <p>
            {this.props.description.length < 77
              ? this.props.description
              : this.props.description.substring(0, 76) + "..."}
          </p>
          <ul>
            <li>Members Count: {this.state.members}</li>
            <li>Targets Count: {this.state.targets}</li>
            <li>Posts Count: {this.state.posts}</li>
            <li>Status: {this.props.status}</li>
            <li>Create Date: {this.props.CreateDate}</li>
          </ul>
        </div>
        <button
          className="OperationCardContainerButton"
          onClick={() => {
            window.location = "/operation_profile/" + this.props.id;
          }}
        >
          Navigate to Operation
        </button>
      </div>
    );
  }
}

export default OperationCard;
