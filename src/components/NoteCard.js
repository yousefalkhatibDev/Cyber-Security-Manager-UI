import React from "react";
import Moment from "moment";
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
          <Modal.Body>
            <div className="NoteModalContent">
              <img src={this.props.UserImage} className="NoteModalContent-Img" />
              <div className="NoteModalContent-AuthData">
                <p className="NoteModalContent-AuthName">{this.props.author}</p>
                <p className="NoteModalContent-CreateDate">{Moment(this.props.CreateDate).format("MMM Do YY")}</p>
              </div>
              <p className="NoteModalContent-Title">{this.props.title}</p>
              <p className="NoteModalContent-Description">{this.props.text}</p>
            </div>

            <div className="ModalButtons">
              <button
                className="OkButton"
                onClick={this.DeleteModal}
              >Delete</button>
              <button className="CancelButton" onClick={this.DisplayNote}>Cancel</button>
            </div>
          </Modal.Body>
        </Modal>

        <Modal show={this.state.DeleteModal} onHide={this.DeleteModal}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Note</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <p>Are you sure you want to delete this Note</p>
            </Form>
            <div className="ModalButtons">
              <button
                className="DeleteButton"
                onClick={() => {
                  this.DeleteNote();
                  this.DeleteModal();
                  this.DisplayNote();
                }}
              >Delete</button>
              <button className="CancelButton" onClick={this.DeleteModal}>Cancel</button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default NoteCard;
