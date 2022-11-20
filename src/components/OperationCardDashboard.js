import React from "react";
import Moment from "moment";
import API from "../helper/API";
import operationDefault from "../imgs/operation.jpg"
import noLastAccessBackground from "../imgs/no-last-access-background.svg"

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
                        operationDefault
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
        if (!this.props.noLastAccess) {
            this.GetImage();
        }
        this.GetPostsCount();
        this.GetMembersCount();
        this.GetTargetsCount();
    }

    render() {
        return (
            <div
                className="OperationCardContainer"
                ref={this.operationCardRef}
                style={{ width: `${this.props.width}%`, padding: "25px" }}
            >
                <div className="OperationCardDashboard-container">
                    {
                        this.props.noLastAccess
                            ?
                            (
                                <img src={noLastAccessBackground} alt="vector" style={{ objectFit: "contain", backgroundColor: "rgb(230, 230, 230)" }} />
                            )
                            :
                            (
                                <img src={this.state.image} alt="vector" />
                            )
                    }

                    {
                        !this.props.noLastAccess
                        &&
                        (
                            <div className="OperationDescription">
                                <p className="OperationDescription-title">
                                    {/* {this.props.description.length < 77
                                ? this.props.description
                                : this.props.description.substring(0, 76) + "..."} */}
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
                        )
                    }

                    {
                        this.props.status === "inactive" && !this.props.noLastAccess ?
                            (
                                <p style={{ paddingRight: "20px", color: "red" }}>

                                    {this.props.status}
                                </p>
                            )
                            :
                            !this.props.noLastAccess
                                ?

                                (
                                    <p style={{ paddingRight: "20px", color: "green" }}>

                                        {this.props.status}
                                    </p>
                                )
                                :
                                (
                                    <p id="UnknownLabel">
                                        Unknown
                                    </p>
                                )
                    }
                </div>
                <hr className="DashboardHr" style={{ display: this.props.noLastAccess ? "none" : null }} />
                <div className="OperationCardDashboardContainerStatus">
                    <div className="OperationCardDashboardContainerStatus-container">
                        <div>
                            Members Count :
                            <p>{this.state.MembersCount}</p>
                        </div>
                        <span className="separator"></span>
                        <div>
                            Targets Count :
                            <p>{this.state.TargetsCount}</p>
                        </div>
                        <span className="separator"></span>
                        <div>
                            Posts Count :
                            <p>{this.state.PostsCount}</p>
                        </div>
                    </div>
                </div>
                {
                    !this.props.noButton && !this.props.noLastAccess
                    &&
                    (
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
                    )
                }
            </div >
        );
    }
}

export default OperationCardDashboard;
