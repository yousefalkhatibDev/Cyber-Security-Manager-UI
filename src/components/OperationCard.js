import React from "react";
import Moment from "moment";
import API from "../helper/API";

class OperationCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      MembersCount: 0,
      TargetsCount: 0,
      PostsCount: 0,
      image: "",
    };

    this.GetImage = this.GetImage.bind(this);
    this.GetPostsCount = this.GetPostsCount.bind(this);
    this.GetTargetsCount = this.GetTargetsCount.bind(this);
    this.GetMembersCount = this.GetMembersCount.bind(this);
  }

  async GetImage() {
    const data = { OperationID: this.props.id };
    await API.post("/get_operation_image", data).then(async (respone) => {
      const res = respone.data;
      if (res.ErrorMessage) window.alert(res.ErrorMessage);
      if (
        res.data === false ||
        res.data.o_image === "" ||
        res.data.o_image === null
      ) {
        this.setState({
          image:
            "https://img.freepik.com/free-vector/neon-cyber-security-concept-with-padlock-circuit_23-2148536303.jpg?w=900&t=st=1660930843~exp=1660931443~hmac=efcef9e6d44df72e8f8d1f679f29b28823bd0313b2a61eefecbda97b8622878d",
        });
      } else {
        this.setState({ image: res.data.o_image });
      }
    });
  }

  async GetPostsCount() {
    const data = { OperationID: this.props.id };
    await API.post("/get_operation_posts_count", data).then(async (respone) => {
      const res = respone.data;
      if (res.ErrorMessage) window.alert(res.ErrorMessage);
      if (res.data) this.setState({ PostsCount: res.data[0].PostsCount });
    });
  }

  async GetTargetsCount() {
    const data = { OperationID: this.props.id };
    await API.post("/get_operation_targets_count", data).then(
      async (respone) => {
        const res = respone.data;
        if (res.ErrorMessage) window.alert(res.ErrorMessage);
        if (res.data) this.setState({ TargetsCount: res.data[0].TargetsCount });
      }
    );
  }

  async GetMembersCount() {
    const data = { OperationID: this.props.id };
    await API.post("/get_operation_members_count", data).then(
      async (respone) => {
        const res = respone.data;
        if (res.ErrorMessage) window.alert(res.ErrorMessage);
        if (res.data) this.setState({ MembersCount: res.data[0].MembersCount });
      }
    );
  }

  componentDidMount() {
    this.GetImage();
    this.GetPostsCount();
    this.GetMembersCount();
    this.GetTargetsCount();
  }

  render() {
    return (
      <div
        className="OperationCardContainer"
        style={{ width: `${this.props.width}%` }}
      >
        <div
          className="OperationImg ConstRadius"
          style={{ position: "relative" }}
        >
          <img src={this.state.image} alt="vector" />
          <h2 className="OperationCard-name">{this.props.name}</h2>
        </div>

        <div className="OperationDescription">
          <p>
            {this.props.description.length < 77
              ? this.props.description
              : this.props.description.substring(0, 76) + "..."}
          </p>
          <ul>
            <li>Members Count: {this.state.MembersCount}</li>
            <li>Targets Count: {this.state.TargetsCount}</li>
            <li>Posts Count: {this.state.PostsCount}</li>
            <li>Status: {this.props.status}</li>
            <li>
              Create Date: {Moment(this.props.CreateDate).format("MMM Do YY")}
            </li>
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
