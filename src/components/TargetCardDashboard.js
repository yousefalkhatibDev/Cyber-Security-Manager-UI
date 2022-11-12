import React from "react";
import Moment from "moment";
import API from "../helper/API";
import targetDefault from "../imgs/target.jpg"

class TargetCardDashboard extends React.Component {
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
                <div className="TargetCardDashboard-container">
                    <img src={this.state.image} alt="vector" />
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
                <hr className="DashboardHr" />
                <div className="TargetCardDashboardContainerStatus">
                    <div className="TargetCardDashboardContainerStatus-container">
                        <div>
                            Notes Count :
                            <p>{this.state.NotesCount}</p>
                        </div>
                        <span className="separator"></span>
                        <div>
                            Type :
                            <p>{this.props.type}</p>
                        </div>
                        <span className="separator"></span>
                        <div>
                            Last Update :
                            <p>{Moment(this.props.UpdateDate).format("MMM Do YY")}</p>
                        </div>
                    </div>
                </div>
                {
                    !this.props.noButton
                    &&
                    (
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
                    )
                }
            </div>
        );
    }
}

export default TargetCardDashboard;
