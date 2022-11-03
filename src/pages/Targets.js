import React from "react";
import TargetCard from "../components/TargetCard";
import API from "../helper/API";
import Pagination from "../components/Pagination";
import { FiTarget } from "react-icons/fi";

class Targets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      targets: [],
      filter: "",
      search: "",
      currentPage: 1,
      targetsToDisplayNumber: 4,
    };

    this.GetTargets = this.GetTargets.bind(this);
    this.UpdateFilter = this.UpdateFilter.bind(this);
    this.UpdateSearch = this.UpdateSearch.bind(this);
    this.setCurrentPage = this.setCurrentPage.bind(this);
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

  setCurrentPage(page) {
    this.setState({ currentPage: page });
  }

  async componentDidMount() {
    await this.GetTargets();
  }

  render() {
    let lastTargetIndex =
      this.state.currentPage * this.state.targetsToDisplayNumber;
    let firstTargetIndex = lastTargetIndex - this.state.targetsToDisplayNumber;
    const currentTargetsToDisplay = this.state.targets.slice(
      firstTargetIndex,
      lastTargetIndex
    );
    return (
      <>
        <div className="pageHeader">
          <FiTarget
            color="white"
            className="pageHeader-icon"
            textDecoration="none"
          />
          <div className="pageHeader-title">
            <h1>Targets</h1>
            <p>See who people are targeting!</p>
          </div>
        </div>
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
          <div className="TargetsContainer">
            {currentTargetsToDisplay.map((target, i) => {
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
            <Pagination
              totalOperationsNumber={this.state.targets.length}
              postsToDisplayNumber={this.state.targetsToDisplayNumber}
              setCurrentPage={this.setCurrentPage}
              currentPage={this.state.currentPage}
            />
          </div>
        </div>
      </>
    );
  }
}

export default Targets;
