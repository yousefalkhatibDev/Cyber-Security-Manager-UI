import React from "react";
import OperationCard from "../components/OperationCard";
import TargetCard from "../components/TargetCard";
import API from "../helper/API";
// import ProgressBar from "react-bootstrap/ProgressBar";
import { MdDashboard } from "react-icons/md";
// import Summary from "../components/Summary";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      operations: {},
      recentPosts: {},
      targets: {},
      recentTargets: {},
      progress: 0,
      TargetsCount: 0,
      OperationsCount: 0,
    };

    this.GetOperations = this.GetOperations.bind(this);
    this.GetRecentPosts = this.GetRecentPosts.bind(this);
    this.GetPosts = this.GetPosts.bind(this);
    this.GetTargets = this.GetTargets.bind(this);
    this.GetRecentTargets = this.GetRecentTargets.bind(this);
    this.GetTargetsCount = this.GetTargetsCount.bind(this);
    this.GetOperationsCount = this.GetOperationsCount.bind(this);
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

  async GetPosts(id) {
    const data = { OperationID: id };

    await API.post("/get_posts", data)
      .then((respone) => {
        const res = respone.data;

        if (res.ErrorMessage) {
          window.alert(res.ErrorMessage);
        }

        if (res.data) {
          this.setState({
            recentPosts: [...this.state.recentPosts, ...res.data],
          });
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

        if (res.ErrorMessage) {
          window.alert(res.ErrorMessage);
        }

        if (res.data) {
          this.setState({ recentTargets: res.data });
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  async GetRecentPosts() {
    const token = window.sessionStorage.getItem("token");
    const data = { Token: token };

    await API.post("/get_recent_posts", data)
      .then((respone) => {
        const res = respone.data;

        if (res.ErrorMessage) {
          window.alert(res.ErrorMessage);
        }

        if (res.data) {
          this.setState({ recentPosts: res.data });
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  GoToPostOperation(id) {
    window.location.href = `/operation_profile/${id}`;
  }

  GoToTarget(id) {
    window.location.href = `/target_profile/${id}`;
  }

  async componentDidMount() {
    this.GetOperations();
    this.GetTargets();
    this.GetRecentPosts();
    this.GetRecentTargets();
    this.GetOperationsCount();
    this.GetTargetsCount();
  }

  render() {
    return (
      <>
        <div className="pageHeader">
          <MdDashboard
            color="green"
            className="pageHeader-icon"
            textDecoration="none"
          />
          <div className="pageHeader-title">
            <h1>Dashboard</h1>
            <p>Check out your status and progress!</p>
          </div>
        </div>
        <div className="dashboard">
          <div className="userRecentAccess-Container">
            <div className="userOperations-recent">
              <h4>Last accessed operation</h4>
              {this.state.operations.length && (
                <OperationCard
                  key={1}
                  id={this.state.operations[0].o_id}
                  name={this.state.operations[0].o_name}
                  description={this.state.operations[0].o_description}
                  status={this.state.operations[0].o_state}
                  CreateDate={this.state.operations[0].o_create_date}
                  width={90}
                />
              )}
            </div>
            <div className="userTargets-recent">
              <h4>Last accessed target</h4>
              {this.state.targets.length && (
                <TargetCard
                  key={2}
                  id={this.state.targets[0].t_id}
                  name={this.state.targets[0].t_name}
                  description={this.state.targets[0].t_description}
                  type={this.state.targets[0].t_type}
                  operation={this.state.targets[0].o_name}
                  CreateDate={this.state.targets[0].t_create_date}
                  UpdateDate={this.state.targets[0].t_update_date}
                  width={90}
                />
              )}
            </div>
          </div>

          <div className="userInfoCards-Container">
            <div className="userInfoCards-card userInfoCards-recentPosts">
              <h5>Recent Posts</h5>
              {this.state.recentPosts.map((el) => {
                return (
                  <div className="postCard" key={el.p_id}>
                    <div className="postCard-content">
                      <img
                        alt=""
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
                      />
                      <div className="postCard-text">
                        <h5>{el.p_title}</h5>
                        <h6>By {el.u_name}</h6>
                        <p>{el.p_text}</p>
                      </div>
                    </div>
                    <button
                      class="OperationCardContainerButton"
                      onClick={() => this.GoToPostOperation(el.p_operation)}
                    >
                      Navigate to Operation
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="userInfoCards-card userInfoCards-recentTargets">
              <h5>Recent Targets</h5>
              {this.state.recentTargets.map((el) => {
                return (
                  <div className="targetCard" key={el.t_id}>
                    <div className="targetCard-content">
                      <img
                        alt=""
                        src="https://img.freepik.com/premium-vector/anonymous-hacker-concept-with-flat-design_23-2147895788.jpg?w=740"
                      />
                      <div className="targetCard-text">
                        <h5>{el.t_name}</h5>
                        <p>{el.t_description}</p>
                      </div>
                    </div>
                    <button
                      class="OperationCardContainerButton"
                      onClick={() => this.GoToTarget(el.t_id)}
                    >
                      Navigate to Target
                    </button>
                  </div>
                );
              })}
            </div>
            {/* <div className="userInfoCards-card">
              <h5>Level</h5>
              <div className="userInfoCards-NextLevel">
                <p>
                  Next Rank - <span>Level2</span>
                </p>
              </div>
              <div className="userInfoCards-ProgressBar">
                <ProgressBar
                  now={this.state.progress}
                  label={`${this.state.progress}%`}
                />
              </div>
              <div className="userInfoCards-NextLevel">
                <p>10/200</p>
              </div>
            </div> */}
            <div className="userInfoCards-card">
              <h5>More information</h5>
              <p className="userInfoCount">
                Operations: <span>{this.state.OperationsCount}</span>
              </p>
              <p className="userInfoCount">
                Targets: <span>{this.state.TargetsCount}</span>
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Dashboard;
