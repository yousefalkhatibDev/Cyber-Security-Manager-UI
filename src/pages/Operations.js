import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
// import { IoIosArrowForward } from "react-icons/io";

import OperationCard from "../components/OperationCard";
import API from "../helper/API";

class Operations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      operations: [],
      modal: false,
      OperationName: "",
      OperationPassword: "",
      OperationDescription: "",
      OperationState: "State",
    };

    this.ModalShow = this.ModalShow.bind(this);
    this.UpdateName = this.UpdateName.bind(this);
    this.UpdatePassword = this.UpdatePassword.bind(this);
    this.UpdateDescription = this.UpdateDescription.bind(this);
    this.UploadOperation = this.UploadOperation.bind(this);
    this.UpdateState = this.UpdateState.bind(this);
    this.GetOperations = this.GetOperations.bind(this);
  }

  ModalShow() {
    this.setState({
      modal: !this.state.modal,
      OperationName: "",
      OperationPassword: "",
      OperationDescription: "",
      OperationState: "State",
    });
  }

  UpdateName(event) {
    this.setState({
      OperationName: event.target.value,
    });
  }

  UpdatePassword(event) {
    this.setState({
      OperationPassword: event.target.value,
    });
  }

  UpdateDescription(event) {
    this.setState({
      OperationDescription: event.target.value,
    });
  }

  UpdateState(value) {
    this.setState({
      OperationState: value,
    });
  }

  async GetOperations() {
    const id = window.sessionStorage.getItem("token");
    const data = { Token: id };

    await API.post("/get_operations", data)
      .then((respone) => {
        const res = respone.data;
        if (res.data) {
          this.setState({ operations: res.data });
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  async UploadOperation() {
    const data = {
      Token: window.sessionStorage.getItem("token"),
      OperationName: this.state.OperationName,
      OperationPassword: this.state.OperationPassword,
      OperationDescription: this.state.OperationDescription,
      OperationState: this.state.OperationState,
    };

    await API.post("/add_operation", data)
      .then((respone) => {
        const res = respone.data;
        if (res.data) {
          this.GetOperations();
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  componentDidMount() {
    this.GetOperations();
  }

  render() {
    return (
      <div className="Operations">
        <h1 style={{ marginLeft: "20px" }}>Operations</h1>

        <div className="SearchContainer">
          <div>
            <button disabled>Search</button>
            <input
              placeholder="Search by name or description"
              type="text"
              className="Search"
            />
          </div>

          <div>
            <button disabled>Sort by</button>
            <select className="Sort">
              <option value="Name">Name</option>
              <option value="Date">Date</option>
              <option value="Date">State</option>
              <option value="Members Count">Members Count</option>
            </select>
          </div>

          <button className="NewObject" onClick={this.ModalShow}>
            New Operation
          </button>
        </div>

        <p>add panigation </p>
        {/* <p className="pagination"> <IoIosArrowForward /> </p> */}

        {this.state.operations.map((operation, i) => {
          return (
            <OperationCard
              key={i}
              id={operation.o_id}
              name={operation.o_name}
              description={operation.o_description}
              status={operation.o_state}
              CreateDate={operation.o_create_date}
            />
          );
        })}

        <Modal show={this.state.modal} onHide={this.ModalShow}>
          <Modal.Header closeButton>
            <Modal.Title>New Operation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Operation Name</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="e.g. Alpha, Bravo"
                  autoFocus
                  onChange={this.UpdateName}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Operation Password</Form.Label>
                <Form.Control
                  type="password"
                  autoFocus
                  onChange={this.UpdatePassword}
                />
              </Form.Group>
              <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  {this.state.OperationState}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => this.UpdateState("active")}>
                    Active
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => this.UpdateState("inactive")}>
                    Inactive
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Operation Description</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="about the operation"
                  rows={3}
                  onChange={this.UpdateDescription}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.ModalShow}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                this.UploadOperation();
                this.ModalShow();
              }}
            >
              Save Operation
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Operations;
