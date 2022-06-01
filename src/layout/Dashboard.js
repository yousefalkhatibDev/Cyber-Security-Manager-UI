import React from "react";

import Summary from "../componenst/Summary";
import LastOperation from "../componenst/LastOperation";
import TargetCard from "../componenst/TargetCard";

class Dashboard extends React.Component {
  render() {
    return (
      <div className="dashboard">
        <h2>Dashboard</h2>
        <Summary />
        <LastOperation />
        <TargetCard />
      </div>
    );
  }
}

export default Dashboard;
