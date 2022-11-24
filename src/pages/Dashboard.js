import React from "react";
import OperationCardDashboard from "../components/OperationCardDashboard";
import TargetCardDashboard from "../components/TargetCardDashboard";
import API from "../helper/API";
// import ProgressBar from 'react-bootstrap/ProgressBar';
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import dashboardIcon from "../icons/dashboard-fill.svg"
import operationIcon from "../icons/operation.svg"
import targetIcon from "../icons/target.svg"
import logoutIcon from "../icons/Logout.svg"
import profileIcon from "../icons/profile.svg"
import Carousel from 'react-grid-carousel'
import emptyBoxIcon from "../icons/empty-box.svg"
// import Summary from "../components/Summary";"


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      operations: [],
      recentPosts: [],
      targets: [],
      recentTargets: [],
      progress: 0,
      TargetsCount: 0,
      OperationsCount: 0,
      UserImage: "",
      UserName: "",
      isMobile: false
    };

    this.GetOperations = this.GetOperations.bind(this);
    this.GetRecentPosts = this.GetRecentPosts.bind(this);
    this.GetTargets = this.GetTargets.bind(this);
    this.GetRecentTargets = this.GetRecentTargets.bind(this);
    this.GetTargetsCount = this.GetTargetsCount.bind(this);
    this.GetOperationsCount = this.GetOperationsCount.bind(this);
    this.GetUserInfo = this.GetUserInfo.bind(this)
  }

  async GetTargetsCount() {
    const token = window.sessionStorage.getItem("token");
    const data = { Token: token };

    await API.post("/get_targets_count", data)
      .then((respone) => {
        const res = respone.data;

        if (res.ErrorMessage) {
          window.alert(res.ErrorMessage);
        }

        if (res.data) {
          this.setState({ TargetsCount: res.data[0].TargetsCount });
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  async GetOperationsCount() {
    const token = window.sessionStorage.getItem("token");
    const data = { Token: token };

    await API.post("/get_operations_count", data)
      .then((respone) => {
        const res = respone.data;

        if (res.ErrorMessage) {
          window.alert(res.ErrorMessage);
        }

        if (res.data) {
          this.setState({ OperationsCount: res.data[0].OperationsCount });
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  async GetOperations() {
    const token = window.sessionStorage.getItem("token");
    const data = { Token: token, search: this.state.search };

    await API.post("/get_last_accessed_operation", data)
      .then((respone) => {
        const res = respone.data;
        if (res.ErrorMessage) {
          window.alert(res.ErrorMessage);
        }

        if (res.data) {
          this.setState({ operations: res.data });
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  async GetTargets() {
    const token = window.sessionStorage.getItem("token");
    const data = { Token: token, search: this.state.search };

    await API.post("/get_last_accessed_target", data)
      .then((respone) => {
        const res = respone.data;
        if (res.ErrorMessage) {
          window.alert(res.ErrorMessage);
        }

        if (res.data) {
          this.setState({ targets: res.data });
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  async GetRecentTargets() {
    const token = window.sessionStorage.getItem("token");
    const data = { Token: token };

    await API.post("/get_recent_targets", data)
      .then((respone) => {
        const res = respone.data;

        if (res.data) {
          this.setState({ recentTargets: res.data });
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  async GetRecentPosts() {
    // const token = window.sessionStorage.getItem("token");
    // const data = { Token: token };

    // await API.post("/get_recent_posts", data)
    //   .then((respone) => {
    //     const res = respone.data;
    //     if (res.ErrorMessage) {
    //       window.alert(res.ErrorMessage);
    //     }

    //     if (res.data) {
    //       this.setState({ recentPosts: res.data });
    //     }
    //   })
    //   .catch(function (error) {
    //     console.error(error);
    //   });
    return;
  }

  GoToPostOperation(id) {
    window.location.href = `/operation_profile/${id}`;
  }

  GoToTarget(id) {
    window.location.href = `/target_profile/${id}`;
  }

  componentDidMount() {
    this.GetOperations();
    this.GetTargets();
    this.GetRecentPosts();
    this.GetRecentTargets();
    this.GetOperationsCount();
    this.GetTargetsCount();
    this.GetUserInfo()
    if (window.innerWidth <= 600 && !this.state.isMobile) {
      this.setState({ isMobile: true })
    }
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 600 && !this.state.isMobile) {
        this.setState({ isMobile: true })
      } else if (window.innerWidth > 600 && this.state.isMobile) {
        this.setState({ isMobile: false })
      }
    })
  }

  async GetUserInfo() {
    const data = {
      Token: window.sessionStorage.getItem("token"),
    };

    await API.post("/get_user_info", data)
      .then((respone) => {
        const res = respone.data;

        if (res.ErrorMessage) {
          window.alert(res.ErrorMessage);
        }

        if (res.data) {
          this.setState({
            UserImage: res.data.u_image,
            UserName: res.data.u_name
          })
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  render() {
    return (
      <>
        <div className='pageHeader' style={{ justifyContent: "space-between" }}>
          <div className='pageHeader-title'>
            <img src={dashboardIcon} alt="" />
            <div>
              <h1>Dashboard</h1>
              <p>Check out your status and progress!</p>
            </div>
          </div>
          <div>
            <div className="user-card">
              <div className="user-name">
                <Dropdown style={{ display: "flex", alignItems: "center" }}>
                  <Dropdown.Toggle
                    variant="success"
                    id="dropdown-basic"
                    style={{ border: "none", backgroundColor: "transparent" }}
                  >
                    <img
                      src={this.state.UserImage}
                      alt="user-card"
                      className="user-img-top-bar"
                    />
                  </Dropdown.Toggle>
                  <div className="user-card-nameDiv">{this.state.UserName}</div>
                  <Dropdown.Menu>
                    <Dropdown.Item href="/profile">
                      <Link to="/profile" style={{ textDecoration: "none" }}>
                        <span style={{ marginRight: "25px", color: "black" }}>
                          My Profile
                        </span>{" "}
                        <img src={profileIcon} style={{ width: "15px" }} alt="" />
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item onClick={this.Logout}>
                      <span style={{ marginRight: "50px" }}>Logout</span>{" "}
                      <img src={logoutIcon} style={{ width: "15px" }} alt="" />
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <p>{this.state.UserName}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="dashboard-buttonsSection">
          <button>
            <div>
              <img src={operationIcon} style={{ width: "32px" }} alt="" />
              Operations
              <span className="separator"></span>
              {this.state.operations.length}
            </div>
          </button>
          <button>
            <div>
              <img src={targetIcon} style={{ width: "32px" }} alt="" />
              Targets
              <span className="separator"></span>
              {this.state.targets.length}
            </div>
          </button>
        </div>
        <div className="dashboard">
          <div className="userRecentAccess-Container">
            <div className="userOperations-recent">
              <h4 style={{ color: "rgb(30, 30, 100)", margin: "25px 0px 25px 20px" }}>Last accessed operation</h4>
              {
                this.state.operations.length
                  ?
                  (
                    (
                      <OperationCardDashboard
                        key={1}
                        id={this.state.operations[0].o_id}
                        name={this.state.operations[0].o_name}
                        description={this.state.operations[0].o_description}
                        status={this.state.operations[0].o_state}
                        CreateDate={this.state.operations[0].o_create_date}
                        width={100}
                      />
                    )
                  )
                  :
                  (
                    <OperationCardDashboard
                      width={100}
                      noLastAccess
                    />
                  )
              }
            </div>
            <div className="userTargets-recent">
              <h4 style={{ color: "rgb(30, 30, 100)", margin: "30px 0px 30px 20px" }}>Last accessed target</h4>
              {this.state.targets.length ?
                (
                  <TargetCardDashboard
                    key={2}
                    id={this.state.targets[0].t_id}
                    name={this.state.targets[0].t_name}
                    description={this.state.targets[0].t_description}
                    type={this.state.targets[0].t_type}
                    operation={this.state.targets[0].o_name}
                    CreateDate={this.state.targets[0].t_create_date}
                    UpdateDate={this.state.targets[0].t_update_date}
                    width={100}
                  />
                )
                :
                (
                  <TargetCardDashboard
                    key={2}
                    width={100}
                    noLastAccess
                  />
                )
              }
            </div>
          </div>
          {/* <div className="recentPosts-container">
            <h4 style={{ color: "rgb(30, 30, 100)", display: "inline-block", margin: "25px 0px" }}>Recent Posts</h4>
            <div className="recentPostsCard-container">
              {
                !this.state.recentPosts.length
                &&
                (
                  <div className="NoDataHeader-Container">
                    <h1 className="NoDataHeader-Content">There are no posts to show!</h1>
                    <img src={emptyBoxIcon} alt="" />
                  </div>
                )
              }
              {
                this.state.isMobile && this.state.recentPosts.length > 1
                  &&
                  this.state.recentPosts.length
                  ?
                  (
                    <Carousel cols={2} rows={1} gap={10} >
                      {this.state.recentPosts.slice(0, 2).map((el, i) => {
                        return (
                          <Carousel.Item key={i}>
                            <div className="postCard" key={el.p_id}>
                              <div className="postCard-content">
                                <img
                                  alt=""
                                  src={el.u_image}
                                />
                                <div className="postCard-text">
                                  <h5>{el.u_name}</h5>
                                  <p>{el.p_text}</p>
                                </div>
                              </div>
                              <div className="postCard-buttonContainer">
                                <button
                                  className="postCard-button"
                                  onClick={() => this.GoToPostOperation(el.p_operation)}
                                >
                                  Navigate to Operation
                                </button>
                              </div>
                            </div>
                          </Carousel.Item>
                        );
                      })}
                    </Carousel>
                  )
                  :
                  (
                    this.state.recentPosts.slice(0, 2).map((el) => {
                      return (
                        <div className="postCard" key={el.p_id}>
                          <div className="postCard-content">
                            <img
                              alt=""
                              src={el.u_image}
                            />
                            <div className="postCard-text">
                              <h5>{el.u_name}</h5>
                              <p>{el.p_text}</p>
                            </div>
                          </div>
                          <div className="postCard-buttonContainer">
                            <button
                              className="postCard-button"
                              onClick={() => this.GoToPostOperation(el.p_operation)}
                            >
                              Navigate to Operation
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )
              }
            </div>
          </div> */}

          <div className="recentTargets-container">
            <h4 style={{ color: "rgb(30, 30, 100)", display: "inline-block", margin: "55px 0px 25px 0px" }}>Recent Targets</h4>
            <div className="recentTargetsCard-container">
              {
                !this.state.recentTargets.length
                &&
                (
                  <div className="NoDataHeader-Container">
                    <h1 className="NoDataHeader-Content">You don't seem to have any targets!</h1>
                    <img src={emptyBoxIcon} alt="" />
                  </div>
                )
              }
              {this.state.isMobile && this.state.recentTargets.length > 1
                ?
                (
                  <Carousel cols={2} rows={1} gap={10}>
                    {
                      this.state.recentTargets.slice(0, 2).map((el) => {
                        return (
                          <Carousel.Item>
                            <div className="targetCard" key={el.p_id}>
                              <div className="targetCard-content">
                                <img
                                  alt=""
                                  src={el.t_image}
                                />
                                <div className="targetCard-text">
                                  <h5>{el.t_name}</h5>
                                  <p>{el.t_description}</p>
                                </div>
                              </div>
                              <div className="targetCard-buttonContainer">
                                <button
                                  className="targetCard-button"
                                  onClick={() => this.GoToTarget(el.t_id)}
                                >
                                  Navigate to Target
                                </button>
                              </div>
                            </div>
                          </Carousel.Item>
                        );
                      })
                    }
                  </Carousel>
                )
                :
                (
                  this.state.recentTargets.slice(0, 2).map((el) => {
                    return (
                      <div className="targetCard" key={el.p_id}>
                        <div className="targetCard-content">
                          <img
                            alt=""
                            src={el.t_image}
                          />
                          <div className="targetCard-text">
                            <h5>{el.t_name}</h5>
                            <p>{el.t_description}</p>
                          </div>
                        </div>
                        <div className="targetCard-buttonContainer">
                          <button
                            className="targetCard-button"
                            onClick={() => this.GoToTarget(el.t_id)}
                          >
                            Navigate to Target
                          </button>
                        </div>
                      </div>
                    );
                  })
                )
              }

            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Dashboard;
