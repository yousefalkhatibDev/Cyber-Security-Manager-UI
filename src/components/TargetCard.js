import React from "react";
import Moment from "moment";
import API from "../helper/API";
import targetDefault from "../imgs/target.jpg"

class TargetCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      NotesCount: 0,
      image: "",
    };

    this.GetNotesCount = this.GetNotesCount.bind(this);
    this.GetImage = this.GetImage.bind(this);
  }

  async GetImage() {
    const data = { TargetID: this.props.id };
    await API.post("/get_target_image", data).then(async (respone) => {
      const res = respone.data;
      if (res.ErrorMessage) window.alert(res.ErrorMessage);
      console.log(res)
      if (
        res.data === false ||
        res.data.t_image === "" ||
        res.data.t_image === null
      ) {
        this.setState({
          image:
            targetDefault
        });
      } else {
        this.setState({ image: res.data.t_image });
      }
    });
  }

  async GetNotesCount() {
    const data = { TargetID: this.props.id };
    await API.post("/get_target_notes_count", data).then(async (respone) => {
      const res = respone.data;

      if (res.ErrorMessage) {
        window.alert(res.ErrorMessage);
      }

      if (res.data) {
        this.setState({ NotesCount: res.data[0].NotesCount });
      }
    });
  }

  componentDidMount() {
    this.GetNotesCount();
    this.GetImage();
  }

  render() {
    return (
      <div
        className="TargetCardContainer"
        style={{ width: `${this.props.width}%` }}
      >
        <div className="TargetCard-Container">
          <img src={this.state.image} alt="vector" />
          <div id="TargetCardContent-container">
            <div className="TargetDescription">
              <p className="TargetDescription-title">
                {this.props.name}
              </p>
              <p className="TargetDescription-date">
                {Moment(this.props.CreateDate).format("MMM Do YY")}
              </p>
              <p className="TargetDescription-description">
                {this.props.description.length < 77
                  ? this.props.description
                  : this.props.description.substring(0, 76) + "..."}
              </p>
            </div>
          </div>
        </div>
        <div>
          <hr style={{ width: "100%", marginTop: "-10px" }} />
          <div className="TargetCardContainerStatus">
            <div className="TargetCardContainerStatus-container">
              <div>
                Notes Count: {this.state.NotesCount}
              </div>
              <div>
                Type: {this.props.type}
              </div>
              <div>
                Operation: {this.props.operation}
              </div>
              <div>
                Last UpdateDate: {Moment(this.props.UpdateDate).format("MMM Do YY")}
              </div>
            </div>
          </div>
          <div className="TargetCardDashboardContainerButton">
            <button
              className="TargetCardDashboardContainerButton-button"
              onClick={() => {
                window.location = "/target_profile/" + this.props.id;
              }}
            >
              Navigate to Target
            </button>
          </div>
        </div>
        {/* <button
          className="TargetCardContainerButton"
          onClick={() => {
            window.location = "/target_profile/" + this.props.id;
          }}
        >
          Navigate to Target
        </button> */}
      </div>
    );
  }
}

export default TargetCard;
