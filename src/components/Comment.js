import React from "react";
import API from "../helper/API";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import deleteIcon from "../icons/delete.svg"

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DeleteModal: false,
    };

    this.DeleteComment = this.DeleteComment.bind(this);
    this.DeleteModal = this.DeleteModal.bind(this);
  }

  DeleteModal() {
    this.setState({ DeleteModal: !this.state.DeleteModal });
  }

  async DeleteComment() {
    const data = { CommnetID: this.props.id };

    await API.post("/remove_comment", data)
      .then((respone) => {
        const res = respone.data;
        if (res.ErrorMessage) window.alert(res.ErrorMessage);
        if (res.data) this.props.refresh();
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  render() {
    return (
      <>
        <div className="Comment">
          <div className="CommentAuthContainer">
            <img
              alt=""
              className="CommentAuthImage"
              src={this.props.UserImage}
            />
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <p className="Commentauthor">{this.props.user}</p>
              <p className="Commentauthor">
                {this.props.createDate.split("T")[0]}
              </p>
            </div>
            {this.props.BelongToUser ? (
              <div className="CommentDeleteIcon">
                <img src={deleteIcon} onClick={this.DeleteModal} alt=''/>
              </div>
            ) : null}
          </div>
          <p style={{ fontWeight: 500 }}>{this.props.text}</p>
        </div>

        <Modal show={this.state.DeleteModal} onHide={this.DeleteModal}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <p>Are you sure you want to delete this Comment</p>
            </Form>
            <div className="ModalButtons">
              <button
                className="DeleteButton"
                onClick={() => {
                  this.DeleteComment();
                  this.DeleteModal();
                }}
              >Delete</button>
              <button className="CancelButton" onClick={this.DeleteModal}>Cancel</button>
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default Comment;
