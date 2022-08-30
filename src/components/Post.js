import React from "react";
import Comment from "./Comment";
import API from "../helper/API";

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
    };

    this.GetComments = this.GetComments.bind(this);
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
          <p className="PostComments">Reply</p>
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
      </>
    );
  }
}

export default Post;
