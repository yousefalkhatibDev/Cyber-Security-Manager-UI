import React from "react";
import TargetCard from "../components/TargetCard";
import API from "../helper/API";
import Pagination from "../components/Pagination";
import Dropdown from "react-bootstrap/Dropdown";
import filterIcon from "../icons/Filter.svg"
import { FiTarget, FiSearch } from "react-icons/fi";

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

  async UpdateFilter(value) {
    console.log(value)
    if (value === "all") {
      await this.GetTargets();
    }

    if (value === "date") {
      await this.GetTargets();
      await this.setState({ filter: value });
      let filteredArray = this.state.targets.sort((a, b) => {
        var c = new Date(a.t_create_date);
        var d = new Date(b.t_create_date);
        return c - d;
      });
      await this.setState({ targets: filteredArray });
    }

    if (value === "name") {
      await this.GetTargets();
      await this.setState({ filter: value });
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
          <div className="pageHeader-title">
            <FiTarget
              color="black"
              className="pageHeader-icon"
              textDecoration="none"
            />
            <div>
              <h1>Targets</h1>
              <p>See who people are targeting!</p>
            </div>
          </div>
        </div>
        <div className="Targets">
          <h1 style={{ marginLeft: "20px" }}>Targets</h1>
          <div className="SearchContainer targetsSearchContainer">
            <div className="SearchInputContainer">
              <input
                placeholder="Search by name or description"
                type="text"
                className="Search"
                onChange={this.UpdateSearch}
              />
              <FiSearch size={25} />
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", width: "100%" }}>
              <Dropdown style={{ width: "auto" }}>
                <Dropdown.Toggle
                  variant="success"
                  id="dropdown-basic"
                  style={{ border: "none", backgroundColor: "transparent" }}
                >
                  <img src={filterIcon} width={22} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item key="all" onClick={() => this.UpdateFilter("all")}>
                    <span style={{ marginRight: "25px", color: "black" }}>
                      All
                    </span>
                  </Dropdown.Item>
                  <Dropdown.Item key="name" onClick={() => this.UpdateFilter("name")}>
                    <span style={{ marginRight: "50px" }}>By Name</span>
                  </Dropdown.Item>
                  <Dropdown.Item key="date" onClick={() => this.UpdateFilter("date")}>
                    <span style={{ marginRight: "50px" }}>By Date</span>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          <h2 style={{ color: "rgb(60, 60, 60)" }}>{this.state.targets.length} Targets</h2>
          <hr style={{ marginBottom: "40px" }} />
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
