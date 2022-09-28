import React from "react";
import Moment from "moment";
import API from "../helper/API";

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
      if (res.data === false) {
        this.setState({
          image:
            "https://img.freepik.com/premium-vector/anonymous-hacker-concept-with-flat-design_23-2147895788.jpg?w=740",
        });
      } else {
        this.setState({ image: `data:image/jpeg;base64,${res.data}` });
      }
    });
  }

  async GetNotesCount() {
    const data = { TargetID: this.props.id };
    await API.post("/get_target_notes_count", data).then(async (respone) => {
      const res = respone.data;
      if (res.data) {
        this.setState({ NotesCount: res.data[0].NotesCount });
      }
    });
  }

  componentDidMount() {
    this.GetNotesCount();
    this.GetImage()
  }

  render() {
    return (
      <div className="TargetCardContainer">
        <div className="TargetImg ConstRadius" style={{ position: "relative" }}>
          <img src={this.state.image} alt="vector" />

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
            <li>Notes Count: {this.state.NotesCount}</li>
            <li>Type: {this.props.type}</li>
            {this.props.operation ? (
              <li>Operation: {this.props.operation}</li>
            ) : null}
            {this.props.relation ? (
              <li>Relation: {this.props.relation}</li>
            ) : null}
            <li>
              Create Date: {Moment(this.props.CreateDate).format("MMM Do YY")}
            </li>
            <li>
              Last Update: {Moment(this.props.UpdateDate).format("MMM Do YY")}
            </li>
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
