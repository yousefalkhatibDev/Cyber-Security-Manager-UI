import React from "react";
import { Link } from "react-router-dom";

class Note extends React.Component {
  render() {
    return (
      <div className="note-card-container">
        <div className="summary note-card">
          <h3 className="note-title">target basic info...</h3>
          <p className="note-content">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            {/* industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley survived
            not only five centuries, but also the leap into...... */}
          </p>
          <Link to="/" className="btn-note">
            Display
          </Link>
        </div>
      </div>
    );
  }
}

export default Note;
