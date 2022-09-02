import React from "react";
import TargetCard from "../components/TargetCard";
import API from "../helper/API";

class Targets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      targets: [],
    };

    this.GetTargets = this.GetTargets.bind(this);
  }

  async GetTargets() {
    const id = window.sessionStorage.getItem("token");
    const data = { Token: id };

    await API.post("/get_targets_by_user", data)
      .then((respone) => {
        const res = respone.data;
        if (res.data) {
          this.setState({ targets: res.data });
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  async componentDidMount() {
    await this.GetTargets();
  }

  render() {
    return (
      <div className="Targets">
        <h1 style={{ marginLeft: "20px" }}>Targets</h1>

        <div className="SearchContainer">
          <div>
            <button disabled>Search</button>
            <input
              placeholder="Search by name or description"
              type="text"
              className="Search"
            />
          </div>

          <div style={{ marginLeft: "20px" }}>
            <button disabled>Sort by</button>
            <select className="Sort">
              <option value="Name">Name</option>
              <option value="Operation">Operation</option>
              <option value="Date">Date</option>
            </select>
          </div>
        </div>
        <p>add panigation </p>

        {this.state.targets.map((target, i) => {
          return (
            <TargetCard
              key={i}
              id={target.t_id}
              name={target.t_name}
              description={target.t_description}
              type={target.t_type}
              operation={target.o_name}
              CreateDate={target.t_create_date}
              UpdateDate={target.t_update_date}
            />
          );
        })}
      </div>
    );
  }
}

export default Targets;
