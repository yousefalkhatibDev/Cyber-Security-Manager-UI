import React, { Component } from "react";

export default class ContentWrapper extends Component {
  render() {
    return <div style={{ minHeight: "100vh" }}>{this.props.children}</div>;
  }
}
