import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
// import { IoIosArrowForward } from "react-icons/io";
import OperationCard from "../components/OperationCard";
import API from "../helper/API";
import Pagination from "../components/Pagination";
import { FiSearch } from "react-icons/fi"
import filterIcon from "../icons/Filter.svg"
import operationIcon from "../icons/operation.svg"
// return (
//   <div className="App">
//     <img src={base64State} alt="i" />
//     <a href={base64State} target={base64State}>read pdf</a>
//   </div>
// );
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["PDF", "PNG", "GIF", "JPEG", "TIFF", "PSD", "EPS", "AI"];

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
      OperationState: "inactive",
      Base64State: "",
      FileName: "",
      currentPage: 1,
      operationsToDisplayNumber: 4,
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
    this.setCurrentPage = this.setCurrentPage.bind(this);
  }

  UpdateFileName(FileName) {
    this.setState({ FileName: FileName });
  }

  UpdateBase64(base64) {
    window.localStorage.setItem("base64", base64);
  }

  convertToBase64(file) {

    //Check File is not Empty
    if (file) {
      // Select the very first file from list

      // FileReader function for read the file.
      const fileReader = new FileReader();
      var self = this;

      // Onload of file read the file content
      fileReader.onload = async function (fileLoadedEvent) {
        let base64 = fileLoadedEvent.target.result;
        let fileName = file.name;
        self.UpdateBase64(base64);
        self.UpdateFileName(fileName);
      };
      // // Convert data to base64
      fileReader.readAsDataURL(file);
    }
  }

  async UpdateFilter(value) {
    if (value === "all") {
      await this.GetOperations();
    }

    if (value === "active" || value === "inactive") {
      await this.GetOperations();
      await this.setState({ filter: value });
      var filteredArray = this.state.operations.filter((operation) => {
        return operation.o_state === value;
      });
      await this.setState({ operations: filteredArray });
    }

    if (value === "date") {
      await this.GetOperations();
      await this.setState({ filter: value });
      filteredArray = this.state.operations.sort((a, b) => {
        var c = new Date(a.o_create_date);
        var d = new Date(b.o_create_date);
        return c - d;
      });
      await this.setState({ operations: filteredArray });
    }

    if (value === "name") {
      await this.GetOperations();
      await this.setState({ filter: value });
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

  UpdateState(event) {
    if (event.target.checked === true) {
      this.setState({
        OperationState: "active",
      });
    } else {
      this.setState({
        OperationState: "inactive",
      });
    }
    // if()
    // 
  }

  async GetOperations() {
    const token = window.sessionStorage.getItem("token");
    const data = { Token: token, search: this.state.search };

    await API.post("/get_operations", data)
      .then((respone) => {
        const res = respone.data;

        if (res.ErrorMessage) {
          window.alert(res.ErrorMessage);
        }

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

        if (res.ErrorMessage) {
          window.alert(res.ErrorMessage);
        }

        if (res.data) {
          this.GetOperations();
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  setCurrentPage(page) {
    this.setState({ currentPage: page });
  }

  componentDidMount() {
    this.GetOperations();
  }

  render() {
    let lastOperationIndex =
      this.state.currentPage * this.state.operationsToDisplayNumber;
    let firstOperationIndex =
      lastOperationIndex - this.state.operationsToDisplayNumber;
    const currentOperationsToDisplay = this.state.operations.slice(
      firstOperationIndex,
      lastOperationIndex
    );
    return (
      <>
        <div className="pageHeader">
          <div className="pageHeader-title pageHeader-title-withButton" style={{ width: "95%" }}>
            <div className="pageHeader-title-withButton-Container">
              <img src={operationIcon} style={{ width: "35px" }} />
              <div>
                <h1>Operations</h1>
                <p>Check out new operations and plans!</p>
              </div>
            </div>
            <button className="NewOperationButton" onClick={this.ModalShow}>Add New Operation</button>
          </div>
        </div>
        <div className="Operations">
          <div className="SearchContainer">
            <div className="SearchInputContainer">
              <input
                placeholder="Search by name or description"
                type="text"
                className="Search"
                onChange={this.UpdateSearch}
              />
              <FiSearch size={25} />
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", width: "100%" }}>
              <Dropdown style={{ width: "auto" }}>
                <Dropdown.Toggle
                  variant="success"
                  id="dropdown-basic"
                  style={{ border: "none", backgroundColor: "transparent" }}
                >
                  <img src={filterIcon} width={22} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item key="all" onClick={() => this.UpdateFilter("all")}>
                    <span style={{ marginRight: "25px", color: "black" }}>
                      All
                    </span>
                  </Dropdown.Item>
                  <Dropdown.Item key="name" onClick={() => this.UpdateFilter("name")}>
                    <span style={{ marginRight: "50px" }}>By Name</span>
                  </Dropdown.Item>
                  <Dropdown.Item key="date" onClick={() => this.UpdateFilter("date")}>
                    <span style={{ marginRight: "50px" }}>By Date</span>
                  </Dropdown.Item>
                  <Dropdown.Item key="active" onClick={() => this.UpdateFilter("active")}>
                    <span style={{ marginRight: "50px" }}>Active</span>
                  </Dropdown.Item>
                  <Dropdown.Item key="inactive" onClick={() => this.UpdateFilter("inactive")}>
                    <span style={{ marginRight: "50px" }}>Inactive</span>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          <h2 style={{ color: "rgb(60, 60, 60)" }}>{this.state.operations.length} Operations</h2>
          <hr style={{ marginBottom: "40px" }} />
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
                </Form.Group>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "25px 0px" }}>
                  <h3>State</h3>
                  <Form>
                    <Form.Check
                      type="switch"
                      id="SwitchState-SwitchButton"
                      onClick={this.UpdateState}
                    />
                  </Form>
                </div>
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
                <div className="dragAndDrop">
                  <p>Operation Image</p>
                  <FileUploader handleChange={this.convertToBase64} name="file" types={fileTypes} />
                </div>
              </Form>
              <div className="ModalButtons">
                <button
                  className="OkButton"
                  onClick={() => {
                    this.UploadOperation();
                    this.ModalShow();
                  }}
                >Save Operation</button>
                <button className="CancelButton" onClick={this.ModalShow}>Cancel</button>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </>
    );
  }
}

export default Operations;
