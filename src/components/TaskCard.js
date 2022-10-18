import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import API from "../helper/API";
import Dropdown from "react-bootstrap/Dropdown";


class TaskCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Displaytask: false,
      DeleteModal: false
    };
    this.DisplayTask = this.DisplayTask.bind(this);
    this.DeleteTask = this.DeleteTask.bind(this);
    this.DeleteModal = this.DeleteModal.bind(this);
  }

  DeleteModal() {
    console.log("called")
    this.setState({ DeleteModal: !this.state.DeleteModal });
  }

  async DeleteTask() {
    const data = {
      TaskID: this.props.id,
    };

    await API.post("/remove_task", data)
      .then((respone) => {
        const res = respone.data;

        if (res.ErrorMessage) {
          window.alert(res.ErrorMessage);
        }
  
        if (res.data) {
          this.props.refresh();
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  DisplayTask() {
    this.setState({ DisplayTask: !this.state.DisplayTask });
  }

  render() {
    return (
      <div className="TaskCardContainer">
        <p className="TaskTitle">
          <img alt="" className="PostAuthImage" src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=580&amp;q=80" />
          <p>{this.props.agent}</p>
          <p>{this.props.CreateDate.split("T")[0]}</p>
          {/* {this.props.title.length > 18
            ? this.props.title.substring(0, 18) + " ..."
            : this.props.title} */}
        </p>
        <hr />
        <p className="TaskContent">
          {this.props.text.length > 130
            ? this.props.text.substring(0, 130) + " ..."
            : this.props.text}
        </p>

        <p className="TaskAgent">{this.props.agent}</p>

        <button className="BtnTask" onClick={this.DisplayTask}>
          Display
        </button>

        <Modal show={this.state.DisplayTask} onHide={this.DisplayTask}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{this.props.title}</p>
            <p style={{ fontWeight: "400" }}>{this.props.text}</p>
            {/* <p
              className="PostComments"
              style={{ cursor: "pointer" }}

            >
              Delete
            </p> */}
          </Modal.Body>
          <Modal.Footer>
            <div style={{ marginRight: "auto" }}>
              <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  Change Task Status
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>
                    To Do
                  </Dropdown.Item>
                  <Dropdown.Item>
                    In Progress
                  </Dropdown.Item>
                  <Dropdown.Item>
                    Done
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <Button variant="danger" onClick={() => { this.DeleteModal(); }} >
              Delete
            </Button>
            <Button variant="secondary" onClick={this.DisplayTask}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.DeleteModal} onHide={this.DeleteModal}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <p>Are you sure you want to delete this Task</p>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.DeleteModal}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                this.DeleteTask();
                this.DeleteModal();
                this.DisplayTask();
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

export default TaskCard;
