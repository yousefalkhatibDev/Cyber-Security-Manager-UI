import React from "react";
import TargetCard from "../components/TargetCard";
import API from "../helper/API";

class Targets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      targets: [],
      filter: "",
      search: "",
    };

    this.GetTargets = this.GetTargets.bind(this);
    this.UpdateFilter = this.UpdateFilter.bind(this);
    this.UpdateSearch = this.UpdateSearch.bind(this);
  }

  async UpdateSearch(event) {
    await this.setState({ search: event.target.value });
    this.GetTargets();
  }

  async UpdateFilter(event) {
    if (event.target.value === "all") {
      await this.GetTargets();
    }

    if (event.target.value === "date") {
      await this.GetTargets();
      await this.setState({ filter: event.target.value });
      let filteredArray = this.state.targets.sort((a, b) => {
        var c = new Date(a.t_create_date);
        var d = new Date(b.t_create_date);
        return c - d;
      });
      await this.setState({ targets: filteredArray });
    }

    if (event.target.value === "name") {
      await this.GetTargets();
      await this.setState({ filter: event.target.value });
      let filteredArray = this.state.targets.sort((a, b) => {
        return a.t_name.localeCompare(b.t_name);
      });
      await this.setState({ targets: filteredArray });
    }
  }

  async GetTargets() {
    const token = window.sessionStorage.getItem("token");
    const data = { Token: token, search: this.state.search };

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

        <div className="SearchContainer targetsSearchContainer">
          <div>
            <button disabled>Search</button>
            <input
              placeholder="Search by name or description"
              type="text"
              className="Search"
              onChange={this.UpdateSearch}
            />
          </div>

          <div style={{ marginLeft: "20px" }}>
            <button disabled>Sort by</button>
            <select className="Sort" onChange={this.UpdateFilter}>
              <option value="all">All</option>
              <option value="name">Name</option>
              <option value="date">Date</option>
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
