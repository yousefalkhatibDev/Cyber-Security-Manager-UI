import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import API from "../helper/API";
import Dropdown from "react-bootstrap/Dropdown";
import Moment from "moment";
import { BiDotsVerticalRounded } from "react-icons/bi";


class TaskCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ChangeStatusModal: false,
      DeleteModal: false,
      TaskModal: false,
      status: ""
    };
    this.ChangeStatusTask = this.ChangeStatusTask.bind(this)
    this.HandleChangeStatusTask = this.HandleChangeStatusTask.bind(this)
    this.DeleteTask = this.DeleteTask.bind(this);
    this.DeleteModal = this.DeleteModal.bind(this);
    this.TaskModal = this.TaskModal.bind(this);
    this.UpdateTaskStatus = this.UpdateTaskStatus.bind(this);
  }

  DeleteModal() {
    this.setState({ DeleteModal: !this.state.DeleteModal });
  }

  TaskModal() {
    this.setState({ TaskModal: !this.state.TaskModal });
  }

  async UpdateTaskStatus() {
    this.setState({ ChangeStatusModal: false })

    const data = {
      TaskID: this.props.id,
      TaskStatus: this.state.status,
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

  ChangeStatusTask() {
    this.setState({ ChangeStatusModal: !this.state.ChangeStatusModal, status: "" })
  }

  HandleChangeStatusTask(event) {
    this.setState({ status: event.target.value })
  }
  render() {
    return (
      <div className="TaskCardContainer">
        <p className="TaskTitle">
          <img alt="" className="PostAuthImage" src={this.props.UserImage} alt="" />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <p>{this.props.agent}</p>
            <p> {Moment(this.props.CreateDate).format("MMM Do YY")}</p>
          </div>
          <div className="TaskDottedIcon">
            <Dropdown>
              <Dropdown.Toggle id="dropdown-basic" className="DropDownToggle">
                <BiDotsVerticalRounded />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={this.ChangeStatusTask}>
                  Change Task Status
                </Dropdown.Item>
                <Dropdown.Item onClick={this.DeleteModal}>
                  Delete
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </p>
        <hr />
        <p className="TaskContent">
          {this.props.text.length > 130
            ? this.props.text.substring(0, 130) + " ..."
            : this.props.text}
        </p>

        <p className="TaskAgent">assigned to: {this.props.agent}</p>

        {/* <button className="BtnTask" onClick={this.DisplayTask}>
          Display
        </button> */}

        <button className="BtnTask" onClick={this.TaskModal}>
          Display
        </button>

        <Modal show={this.state.ChangeStatusModal} onHide={this.ChangeStatusTask}>
          <Modal.Header closeButton>
            <Modal.Title>Change Task Status</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Check
                type="radio"
                name="group"
                id="To Do"
                label="To Do"
                value="to do"
                checked={
                  this.state.status === "" ?
                    this.props.state === "to do" && true
                    :
                    this.state.status === "to do" && true
                }
                onChange={this.HandleChangeStatusTask}
              />
              <Form.Check
                type="radio"
                label="In Progress"
                name="group"
                id="In Progress"
                value="in progress"
                checked={
                  this.state.status === "" ?
                    this.props.state === "in progress" && true
                    :
                    this.state.status === "in progress" && true
                }
                onChange={this.HandleChangeStatusTask}
              />
              <Form.Check
                type="radio"
                label="Done"
                name="group"
                id="Done"
                value="done"
                checked={
                  this.state.status === "" ?
                    this.props.state === "done" && true
                    :
                    this.state.status === "done" && true
                }
                onChange={this.HandleChangeStatusTask}
              />
            </Form>
            <button className="NewTaskButton" onClick={() => this.UpdateTaskStatus()}>Save Changes</button>
          </Modal.Body>
        </Modal>

        <Modal show={this.state.DeleteModal} onHide={this.DeleteModal}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <p>Are you sure you want to delete this Task</p>
            </Form>
            <div className="ModalButtons">
              <button
                className="DeleteButton"
                onClick={() => {
                  this.DeleteTask();
                  this.DeleteModal();
                }}
              >Delete</button>
              <button className="CancelButton" onClick={this.DeleteModal}>Cancel</button>
            </div>
          </Modal.Body>
        </Modal>

        <Modal show={this.state.TaskModal} onHide={this.TaskModal}>
          <Modal.Body>
            <div className="TaskModalContent">
              <img src={this.props.UserImage} className="TaskModalContent-Img" alt="" />
              <div className="TaskModalContent-AuthData">
                <p className="TaskModalContent-AuthName">{this.props.author}</p>
                <p className="TaskModalContent-CreateDate">{Moment(this.props.CreateDate).format("MMM Do YY")}</p>
              </div>
              <p className="TaskModalContent-Title">{this.props.title}</p>
              <p className="TaskModalContent-Description">{this.props.text}</p>
            </div>

            <div className="ModalButtons">
              <button
                className="OkButton"
                onClick={this.DeleteModal}
              >Delete</button>
              <button className="CancelButton" onClick={this.TaskModal}>Cancel</button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default TaskCard;
