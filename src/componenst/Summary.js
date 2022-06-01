import React from "react";

class Summary extends React.Component {
  render() {
    return (
      <div className="constainer">
        <div className="summary">
          <div className="title">summery</div>
          <p className="count">
            operations <span>50</span>
          </p>
          <p className="count">
            Targets <span>50</span>
          </p>
          <p className="count">
            Notes <span>50</span>
          </p>
          <p className="count">
            Connections <span>50</span>
          </p>
        </div>
      </div>
    );
  }
}

export default Summary;
