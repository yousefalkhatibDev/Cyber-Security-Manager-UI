import React from "react";

class TargetCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: 5,
    };
  }

  render() {
    return (
      <div className="TargetCardContainer">
        <div className="TargetImg ConstRadius" style={{ position: "relative" }}>
          <img
            src="https://img.freepik.com/premium-vector/anonymous-hacker-concept-with-flat-design_23-2147895788.jpg?w=740"
            alt="vector"
          />

          <h2
            style={{
              position: "absolute",
              bottom: "-17px",
              left: "0px",
              backgroundColor: "#324ab2",
              padding: "5px",
              fontSize: "20px",
              borderTopRightRadius: "3px",
              color: "white",
            }}
          >
            {this.props.name}
          </h2>
        </div>

        <div className="TargetDescription">
          <p>
            {this.props.description.length < 77
              ? this.props.description
              : this.props.description.substring(0, 76) + "..."}
          </p>
          <ul>
            <li>Notes Count: {this.state.notes}</li>
            <li>Type: {this.props.type}</li>
            {this.props.operation ? (
              <li>Operation: {this.props.operation}</li>
            ) : null}
            {this.props.relation ? (
              <li>Relation: {this.props.relation}</li>
            ) : null}
            <li>Create Date: {this.props.CreateDate}</li>
            <li>Last Update: {this.props.UpdateDate}</li>
          </ul>
        </div>
        <button
          className="TargetCardContainerButton"
          onClick={() => {
            window.location = "/target_profile/" + this.props.id;
          }}
        >
          Navigate to Target
        </button>
      </div>
    );
  }
}

export default TargetCard;
