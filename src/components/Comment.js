import React from "react";

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <div>
          <p>{this.props.user}</p>
          <p>{this.props.text}</p>
        </div>
      </>
    );
  }
}

export default Comment;
