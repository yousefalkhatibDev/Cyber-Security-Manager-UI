import React from "react";
import API from "../helper/API";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

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
            <p className="Commentauthor">{this.props.user}</p>
            <p className="Commentauthor">
              {this.props.createDate.split("T")[0]}
            </p>
            {this.props.BelongToUser ? (
              <div className="CommentDottedIcon">
                <Dropdown>
                  <Dropdown.Toggle
                    id="dropdown-basic"
                    className="DropDownToggle"
                  >
                    <BiDotsVerticalRounded />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={this.DeleteModal}>
                      Delete <MdDelete style={{ marginLeft: "60px" }} />
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
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
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.DeleteModal}>
              Close
            </Button>
            <Button
              variant="danger"
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
