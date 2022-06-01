import React from "react";
import Note from "./Note";

class ProfileSlider extends React.Component {
  render() {
    return (
      <div className="profile-slider">
        <div>
          <p className="profile-slider-btn">Targets</p>
          <p className="profile-slider-btn">Operations</p>
          <p className="profile-slider-btn">Charts</p>
        </div>

        <div>
          <Note />
          <Note />
          <Note />
          <Note />
          <Note />
        </div>
      </div>
    );
  }
}

export default ProfileSlider;
