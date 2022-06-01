import React from "react";

class LastOperation extends React.Component {
  render() {
    return (
      <div className="constainer">
        <div className="summary">
          <div className="title">last operation</div>
          <p className="count">
            Title <span>Black operation</span>
          </p>
          <p className="count">
            Members <span>1</span>
          </p>
          <p className="count">
            Targets <span>1</span>
          </p>
          <p className="count">
            Posts <span>1</span>
          </p>
        </div>
      </div>
    );
  }
}

export default LastOperation;
