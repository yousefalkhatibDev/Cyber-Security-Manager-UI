import React from "react";
import OperationCard from "../components/OperationCard";
import API from "../helper/API";
// import Summary from "../components/Summary";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      operations: []
    };
    this.GetOperations = this.GetOperations.bind(this);
  }

  async GetOperations() {
    const token = window.sessionStorage.getItem("token");
    const data = { Token: token, search: this.state.search };

    await API.post("/get_operations", data)
      .then((respone) => {
        const res = respone.data;
        if (res.data) {
          this.setState({ operations: res.data });
          console.log(res.data)
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  componentDidMount() {
    this.GetOperations();
  }

  render() {
    return (
      <div className="dashboard">
        <div className="userOperations-Container">
          <div className="userOperations-recent">
            <h4>Last seen operation</h4>
            {
              this.state.operations.length
              &&
              <OperationCard
                key={1}
                id={this.state.operations[0].o_id}
                name={this.state.operations[0].o_name}
                description={this.state.operations[0].o_description}
                status={this.state.operations[0].o_state}
                CreateDate={this.state.operations[0].o_create_date}
                width={100}
              />
            }
          </div>

          <div className="userOperations-posts">

          </div>
        </div>

        <div className="userInfoCards-Container">
          <div className="userInfoCards-card">
            <h5>Recent Posts</h5>
          </div>
          <div className="userInfoCards-card">
            <h5>Recent Targets</h5>
          </div>
          <div className="userInfoCards-card">
            <h5>Level</h5>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
