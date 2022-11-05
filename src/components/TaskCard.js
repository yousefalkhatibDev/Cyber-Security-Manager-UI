import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import API from "../helper/API";
import Dropdown from "react-bootstrap/Dropdown";
import Moment from "moment";

class TaskCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Displaytask: false,
      DeleteModal: false,
    };

    this.DisplayTask = this.DisplayTask.bind(this);
    this.DeleteTask = this.DeleteTask.bind(this);
    this.DeleteModal = this.DeleteModal.bind(this);
    this.UpdateTaskStatus = this.UpdateTaskStatus.bind(this);
  }

  DeleteModal() {
    this.setState({ DeleteModal: !this.state.DeleteModal });
  }

  async UpdateTaskStatus(NewStatus) {
    const data = {
      TaskID: this.props.id,
      TaskStatus: NewStatus,
    };

    await API.post("/update_task_status", data)
      .then((respone) => {
        const res = respone.data;
        if (res.ErrorMessage) window.alert(res.ErrorMessage);
        if (res.data) this.props.refresh();
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  async DeleteTask() {
    const data = {
      TaskID: this.props.id,
    };

    await API.post("/remove_task", data)
      .then((respone) => {
        const res = respone.data;
        if (res.ErrorMessage) window.alert(res.ErrorMessage);
        if (res.data) this.props.refresh();
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
          <img alt="" className="PostAuthImage" src={this.props.UserImage} />
          <p>{this.props.agent}</p>
          <p> {Moment(this.props.CreateDate).format("MMM Do YY")}</p>
        </p>
        <hr />
        <p className="TaskContent">
          {this.props.text.length > 130
            ? this.props.text.substring(0, 130) + " ..."
            : this.props.text}
        </p>

        <p className="TaskAgent">assigned to: {this.props.agent}</p>

        <button className="BtnTask" onClick={this.DisplayTask}>
          Display
        </button>

        <Modal show={this.state.DisplayTask} onHide={this.DisplayTask}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p style={{ fontWeight: "400" }}>{this.props.text}</p>
            <p className="TaskAgent">to: <img src={this.props.UserImage} style={{ width: "50px", height: "50px" }} alt="user image" />  {this.props.agent}</p>
            <p className="TaskAgent">state: {this.props.state}</p>
            <p className="TaskAgent">
              Create Date: {Moment(this.props.CreateDate).format("MMM Do YY")}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <div style={{ marginRight: "auto" }}>
              <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  Change Task Status
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => {
                      this.UpdateTaskStatus("to do");
                    }}
                  >
                    To Do
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      this.UpdateTaskStatus("in progress");
                    }}
                  >
                    In Progress
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      this.UpdateTaskStatus("done");
                    }}
                  >
                    Done
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <Button
              variant="danger"
              onClick={() => {
                this.DeleteModal();
              }}
            >
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
