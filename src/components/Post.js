import React from "react";
import Comment from "./Comment";
import API from "../helper/API";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      CommentModal: false,
      NewComment: {
        comment: "",
      },
    };

    this.GetComments = this.GetComments.bind(this);
    this.CommentModal = this.CommentModal.bind(this);
    this.UploadComment = this.UploadComment.bind(this);
    this.UpdateComment = this.UpdateComment.bind(this);
  }

  UpdateComment(event) {
    this.setState((prevState) => ({
      NewComment: {
        ...prevState.NewComment,
        comment: event.target.value,
      },
    }));
  }

  async GetComments() {
    const data = {
      PostID: this.props.id,
    };

    await API.post("/get_comments", data)
      .then((respone) => {
        const res = respone.data;
        if (res.data) {
          this.setState({ comments: res.data });
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  async UploadComment() {
    const data = {
      CommnetPost: this.props.id,
      CommnetText: this.state.NewComment.comment,
      Token: window.sessionStorage.getItem("token"),
    };

    await API.post("/add_comment", data)
      .then((respone) => {
        const res = respone.data;
        if (res.data) {
          this.GetComments();
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  CommentModal() {
    this.setState({
      CommentModal: !this.state.CommentModal,
    });
  }

  componentDidMount() {
    this.GetComments();
  }

  render() {
    return (
      <>
        <div className="Post">
          <p className="Postauthor">author: {this.props.author}</p>
          <p className="Postauthor">{this.props.title}</p>
          <p className="PostContent">{this.props.text}</p>
          <hr />
          <p
            className="PostComments"
            style={{ cursor: "pointer" }}
            onClick={this.CommentModal}
          >
            Reply
          </p>
          {this.state.comments.map((comment, i) => {
            return (
              <Comment
                key={i}
                id={comment.c_id}
                text={comment.c_text}
                user={comment.u_name}
              />
            );
          })}
        </div>

        <Modal show={this.state.CommentModal} onHide={this.CommentModal}>
          <Modal.Header closeButton>
            <Modal.Title>New Comment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Comment</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  onChange={this.UpdateComment}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.CommentModal}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                this.UploadComment();
                this.CommentModal();
              }}
            >
              Add Comment
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default Post;
