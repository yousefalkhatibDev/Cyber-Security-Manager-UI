import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
// import { IoIosArrowForward } from "react-icons/io";
import OperationCard from "../components/OperationCard";
import API from "../helper/API";
import Pagination from "../components/Pagination";

// return (
//   <div className="App">
//     <img src={base64State} alt="i" />
//     <a href={base64State} target={base64State}>read pdf</a>
//   </div>
// );

class Operations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      operations: [],
      modal: false,
      search: "",
      filter: "",
      OperationName: "",
      OperationPassword: "",
      OperationDescription: "",
      OperationState: "State",
      Base64State: "",
      FileName: "",
      currentPage: 1,
      operationsToDisplayNumber: 4
    };

    this.ModalShow = this.ModalShow.bind(this);
    this.UpdateName = this.UpdateName.bind(this);
    this.UpdatePassword = this.UpdatePassword.bind(this);
    this.UpdateDescription = this.UpdateDescription.bind(this);
    this.UploadOperation = this.UploadOperation.bind(this);
    this.UpdateState = this.UpdateState.bind(this);
    this.GetOperations = this.GetOperations.bind(this);
    this.UpdateSearch = this.UpdateSearch.bind(this);
    this.UpdateFilter = this.UpdateFilter.bind(this);
    this.UpdateBase64 = this.UpdateBase64.bind(this);
    this.UpdateFileName = this.UpdateFileName.bind(this);
    this.convertToBase64 = this.convertToBase64.bind(this);
    this.setCurrentPage = this.setCurrentPage.bind(this)
  }

  UpdateFileName(FileName) {
    this.setState({ FileName: FileName });
  }

  UpdateBase64(base64) {
    window.localStorage.setItem("base64", base64);
  }

  convertToBase64(event) {
    //Read File
    const selectedFile = document.getElementById("inputFile").files;

    //Check File is not Empty
    if (selectedFile.length > 0) {
      // Select the very first file from list
      const fileToLoad = selectedFile[0];

      // FileReader function for read the file.
      const fileReader = new FileReader();
      var self = this;

      // Onload of file read the file content
      fileReader.onload = async function (fileLoadedEvent) {
        let base64 = fileLoadedEvent.target.result;
        let fileName = event.target.files[0].name;
        self.UpdateBase64(base64);
        self.UpdateFileName(fileName);
      };
      // // Convert data to base64
      fileReader.readAsDataURL(fileToLoad);
    }
  }

  async UpdateFilter(event) {
    if (event.target.value === "all") {
      await this.GetOperations();
    }

    if (event.target.value === "active" || event.target.value === "inactive") {
      await this.GetOperations();
      await this.setState({ filter: event.target.value });
      var filteredArray = this.state.operations.filter((operation) => {
        return operation.o_state === event.target.value;
      });
      await this.setState({ operations: filteredArray });
    }

    if (event.target.value === "date") {
      await this.GetOperations();
      await this.setState({ filter: event.target.value });
      filteredArray = this.state.operations.sort((a, b) => {
        var c = new Date(a.o_create_date);
        var d = new Date(b.o_create_date);
        return c - d;
      });
      await this.setState({ operations: filteredArray });
    }

    if (event.target.value === "name") {
      await this.GetOperations();
      await this.setState({ filter: event.target.value });
      filteredArray = this.state.operations.sort((a, b) => {
        return a.o_name.localeCompare(b.o_name);
      });
      await this.setState({ operations: filteredArray });
    }
  }

  async UpdateSearch(event) {
    await this.setState({ search: event.target.value });
    this.GetOperations();
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
    const token = window.sessionStorage.getItem("token");
    const data = { Token: token, search: this.state.search };

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
      OperationImage: window.localStorage.getItem("base64"),
      FileName: this.state.FileName,
    };

    window.localStorage.removeItem("base64");

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

  setCurrentPage(page) {
    this.setState({ currentPage: page })
  }

  componentDidMount() {
    this.GetOperations();
  }

  render() {
    let lastOperationIndex = this.state.currentPage * this.state.operationsToDisplayNumber
    let firstOperationIndex = lastOperationIndex - this.state.operationsToDisplayNumber
    const currentOperationsToDisplay = this.state.operations.slice(firstOperationIndex, lastOperationIndex)
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
              onChange={this.UpdateSearch}
            />
          </div>

          <div>
            <button disabled>Sort by</button>
            <select className="Sort" onChange={this.UpdateFilter}>
              <option value="all">All</option>
              <option value="name">Name</option>
              <option value="date">Date</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <button className="NewObject" onClick={this.ModalShow}>
            New Operation
          </button>
        </div>
        {/* <p className="pagination"> <IoIosArrowForward /> </p> */}
        <div className="OperationsContainer">
          {currentOperationsToDisplay.map((operation, i) => {
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
        </div>
        <Pagination
          totalOperationsNumber={this.state.operations.length}
          postsToDisplayNumber={this.state.operationsToDisplayNumber}
          setCurrentPage={this.setCurrentPage}
          currentPage={this.state.currentPage}
        />
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
                <Form.Label>Operation Image</Form.Label>
                <Form.Control
                  type="file"
                  autoFocus
                  onChange={this.convertToBase64}
                  id="inputFile"
                  name="inputFile"
                  accept="application/pdf, application/vnd.ms-excel, image/*"
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
