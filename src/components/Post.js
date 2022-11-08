import React from "react";
import Comment from "./Comment";
import API from "../helper/API";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import deleteIcon from "../icons/delete.svg"
import sendIcon from "../icons/send.svg"

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      CommentModal: false,
      DeleteModal: false,
      NewComment: {
        comment: "",
      },
    };

    this.GetComments = this.GetComments.bind(this);
    this.UploadComment = this.UploadComment.bind(this);
    this.UpdateComment = this.UpdateComment.bind(this);
    this.DeleteModal = this.DeleteModal.bind(this);
    this.DeletePost = this.DeletePost.bind(this);
  }

  async DeletePost() {
    const data = {
      PostID: this.props.id,
    };

    await API.post("/remove_post", data)
      .then((respone) => {
        const res = respone.data;
        if (res.ErrorMessage) window.alert(res.ErrorMessage);
        if (res.data) {
          this.props.GetPosts();
          this.props.GetPostsCount();
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  UpdateComment(event) {
    this.setState((prevState) => ({
      NewComment: {
        ...prevState.NewComment,
        comment: event.target.value,
      },
    }));
  }

  DeleteModal() {
    this.setState({ DeleteModal: !this.state.DeleteModal });
  }

  async GetComments() {
    const data = {
      PostID: this.props.id,
      Token: window.sessionStorage.getItem("token")
    };

    await API.post("/get_comments", data)
      .then((respone) => {
        const res = respone.data;
        if (res.ErrorMessage) window.alert(res.ErrorMessage);
        if (res.data) this.setState({ comments: res.data });
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
        if (res.ErrorMessage) window.alert(res.ErrorMessage);
        if (res.data) this.GetComments();
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  // CommentModal() {
  //   this.setState((prevState) => ({
  //     CommentModal: !this.state.CommentModal,
  //     NewComment: {
  //       ...prevState.NewComment,
  //       comment: "",
  //     },
  //   }));
  // }

  componentDidMount() {
    this.GetComments();
  }

  render() {
    return (
      <>
        <div className="Post">
          <div className="PostAuthContainer">
            <img alt="" className="PostAuthImage" src={this.props.UserImage} />
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <p className="Postauthor">{this.props.author}</p>
              <p className="Postauthor">{this.props.createDate.split("T")[0]}</p>
            </div>
            <div className="PostDeleteIcon">
              <img src={deleteIcon} onClick={this.DeleteModal} />
            </div>
          </div>

          <p className="PostTitle">{this.props.title}</p>
          <p className="PostContent" style={{ fontWeight: 500 }}>
            {this.props.text}
          </p>
          <div className="PostInputContainer">
            <input type="text" className="PostInput" onChange={this.UpdateComment} placeholder="reply" />
            <img src={sendIcon} className="PostInputIcon" onClick={this.UploadComment} />
          </div>
          <div
            style={{
              borderLeft: "2px solid rgb(187 187 187)",
              paddingLeft: "10px",
              marginTop: "20px"
            }}
          >
            {this.state.comments.map((comment, i) => {
              return (
                <Comment
                  key={i}
                  id={comment.c_id}
                  text={comment.c_text}
                  user={comment.u_name}
                  UserImage={comment.u_image}
                  BelongToUser={comment.BelongToUser}
                  createDate={comment.c_create_date}
                  refresh={this.GetComments}
                />
              );
            })}
          </div>
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

        <Modal show={this.state.DeleteModal} onHide={this.DeleteModal}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <p>Are you sure you want to delete this post</p>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.DeleteModal}>
              Close
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                this.DeletePost();
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

export default Post;
