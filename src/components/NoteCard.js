import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

class NoteCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DisplayNote: 0,
    };

    this.DisplayNote = this.DisplayNote.bind(this);
  }

  DisplayNote() {
    this.setState({ DisplayNote: !this.state.DisplayNote });
  }

  render() {
    return (
      <div className="NoteCardContainer">
        <p className="NoteTitle">{this.props.title}</p>
        <hr />
        <p className="NoteContent">
          {this.props.text.length > 130
            ? this.props.text.substring(0, 130) + " ..."
            : this.props.text}
        </p>

        <button className="BtnNote" onClick={this.DisplayNote}>
          Display
        </button>

        <Modal show={this.state.DisplayNote} onHide={this.DisplayNote}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{this.props.text}</p>
            <p>{this.props.author}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.DisplayNote}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default NoteCard;
