import React from "react";

class TaskCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="TaskCardContainer">
        <p className="TaskTitle">{this.props.title}</p>
        <hr />
        <p className="TaskContent">
          {this.props.content.length > 130
            ? this.props.content.substring(0, 130) + " ..."
            : this.props.content}
        </p>

        <p className="TaskAgent">{this.props.agent}</p>

        <button className="BtnTask">Display</button>
      </div>
    );
  }
}

export default TaskCard;
