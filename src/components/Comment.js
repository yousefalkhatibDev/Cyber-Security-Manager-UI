import React from "react";
import API from "../helper/API";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

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
    const data = {
      CommnetID: this.props.id,
    };

    await API.post("/remove_comment", data)
      .then((respone) => {
        const res = respone.data;
        if (res.data) {
          this.props.refresh();
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  render() {
    return (
      <>
        <div>
          <p>{this.props.user}</p>
          <p>{this.props.text}</p>
          <p
            className="PostComments"
            style={{ cursor: "pointer" }}
            onClick={this.DeleteModal}
          >
            Delete
          </p>
        </div>

        <Modal show={this.state.DeleteModal} onHide={this.DeleteModal}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <p>Are you sure you want to delete this Comment</p>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.DeleteModal}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                this.DeleteComment();
                this.DeleteModal();
              }}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default Comment;
