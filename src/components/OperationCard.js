import React from "react";
import Moment from "moment";
import API from "../helper/API";

class OperationCardDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      MembersCount: 0,
      TargetsCount: 0,
      PostsCount: 0,
      image: ""
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
        className="OperationCardContainer OperationCardContainer-OperationsPage"
        ref={this.operationCardRef}
        style={{ width: `${this.props.width}%` }}
      >
        <div className="OperationCard-container" style={{ position: "relative" }}>
          <img src={this.state.image} alt="vector" />
          <div id="OperationCardContent-container">
            <div className="OperationDescription">
              <p className="OperationDescription-title">
                {this.props.name}
              </p>
              <p className="OperationDescription-date">
                {Moment(this.props.CreateDate).format("MMM Do YY")}
              </p>
              <p className="OperationDescription-description">
                {this.props.description.length < 77
                  ? this.props.description
                  : this.props.description.substring(0, 76) + "..."}
              </p>
            </div>
            {
              this.props.status === "inactive" ?
                (
                  <p style={{ paddingRight: "20px", paddingTop: "10px", color: "red" }}>

                    {this.props.status}
                  </p>
                )
                :
                (
                  <p style={{ paddingRight: "20px", paddingTop: "10px", color: "green" }}>
                    {this.props.status}
                  </p>
                )
            }
          </div>
        </div>
        <div>
          <hr style={{ width: "100%", marginTop: "-10px" }} />
          <div className="OperationCardContainerStatus">
            <div className="OperationCardContainerStatus-container">
              <div>
                Members Count: {this.state.MembersCount}
              </div>
              <div>
                Targets Count: {this.state.TargetsCount}
              </div>
              <div>
                Posts Count: {this.state.PostsCount}
              </div>
            </div>
          </div>
          <div className="OperationCardDashboardContainerButton">
            <button
              className="OperationCardDashboardContainerButton-button"
              onClick={() => {
                window.location = "/operation_profile/" + this.props.id;
              }}
            >
              Navigate to Operation
            </button>
          </div>
        </div>
      </div >
    );
  }
}

export default OperationCardDashboard;
