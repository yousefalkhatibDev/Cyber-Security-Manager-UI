import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import API from "../helper/API";

class NoteCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DisplayNote: false,
      DeleteModal: false,
    };

    this.DisplayNote = this.DisplayNote.bind(this);
    this.DeleteNote = this.DeleteNote.bind(this);
    this.DeleteModal = this.DeleteModal.bind(this);
  }

  DeleteModal() {
    this.setState({ DeleteModal: !this.state.DeleteModal });
  }

  async DeleteNote() {
    const data = {
      NoteID: this.props.id,
    };

    await API.post("/remove_note", data)
      .then((respone) => {
        const res = respone.data;
        if (res.ErrorMessage) window.alert(res.ErrorMessage);
        if (res.data) {
          this.props.GetNotes();
          this.props.GetNotesCount();
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  DisplayNote() {
    this.setState({ DisplayNote: !this.state.DisplayNote });
  }

  render() {
    return (
      <div className="NoteCardContainer">
        <p className="NoteTitle">
          <img alt="" className="PostAuthImage" src={this.props.UserImage} />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <p>{this.props.author}</p>
            <p>{this.props.CreateDate.split("T")[0]}</p>
          </div>
        </p>
        <p className="NoteContent">
          <p>{this.props.title}</p>
          <p style={{ fontWeight: "500" }}>
            {this.props.text.length > 90
              ? this.props.text.substring(0, 130) + " ..."
              : this.props.text}
          </p>
        </p>

        <button className="BtnNote" onClick={this.DisplayNote}>
          Display
        </button>

        <Modal show={this.state.DisplayNote} onHide={this.DisplayNote}>
          <Modal.Header closeButton>
            <Modal.Title>
              {this.props.title} By: {this.props.author}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{this.props.text}</p>
            <p>type: {this.props.type}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.DeleteModal}>
              Delete
            </Button>
            <Button variant="secondary" onClick={this.DisplayNote}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.DeleteModal} onHide={this.DeleteModal}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Note</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <p>Are you sure you want to delete this Note</p>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.DeleteModal}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                this.DeleteNote();
                this.DeleteModal();
                this.DisplayNote();
              }}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default NoteCard;
