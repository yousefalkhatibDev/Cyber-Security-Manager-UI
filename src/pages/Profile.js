import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import API from "../helper/API";
import Form from "react-bootstrap/Form";
import profileIcon from "../icons/profile.svg";
import cameraIcon from "../icons/Camera.svg";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteModal: false,
      UserInfo: {},
      UserNewInfo: {
        name: "",
        firstName: "",
        lastName: "",
        email: "",
        bio: "",
        modal: false
      },
    };
    this.ModalShow = this.ModalShow.bind(this);
    this.DeleteModal = this.DeleteModal.bind(this)
    this.GetUserInfo = this.GetUserInfo.bind(this);
    this.UpdateUserName = this.UpdateUserName.bind(this);
    this.UpdateUserEmail = this.UpdateUserEmail.bind(this);
    this.UpdateUserBio = this.UpdateUserBio.bind(this);
    this.UploadNewUserInfo = this.UploadNewUserInfo.bind(this);
    this.UpdateUserImage = this.UpdateUserImage.bind(this);
    this.DeleteUser = this.DeleteUser.bind(this)
    this.convertToBase64 = this.convertToBase64.bind(this);
  }

  ModalShow() {
    this.setState({
      modal: !this.state.modal
    });
  };

  DeleteModal() {
    this.setState({
      deleteModal: !this.state.deleteModal
    });
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
        self.UpdateUserImage(base64);
        document.getElementById("inputFile").value = null;
      };
      // // Convert data to base64
      fileReader.readAsDataURL(fileToLoad);
    }
  }

  async UpdateUserImage(value) {
    const data = {
      Token: window.sessionStorage.getItem("token"),
      UserImage: value,
    };

    await API.post("/update_user_image", data)
      .then((respone) => {
        const res = respone.data;

        if (res.ErrorMessage) {
          window.alert(res.ErrorMessage);
        }

        if (res.data) {
          this.GetUserInfo();
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  async UploadNewUserInfo() {
    const data = {
      Token: window.sessionStorage.getItem("token"),
      UserEmail: this.state.UserNewInfo.email,
      UserName: this.state.UserNewInfo.name,
      UserBio: this.state.UserNewInfo.bio,
    };

    await API.post("/update_user_info", data)
      .then((respone) => {
        const res = respone.data;

        if (res.ErrorMessage) {
          window.alert(res.ErrorMessage);
        }

        if (res.data) {
          this.GetUserInfo();
          this.ModalShow()
          this.setState((prevState) => ({
            UserNewInfo: {
              ...prevState.UserNewInfo,
              name: this.state.UserInfo.u_name,
              email: this.state.UserInfo.u_email,
              bio: this.state.UserInfo.u_bio,
            },
          }));
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  UpdateUserName(event) {
    this.setState((prevState) => ({
      UserNewInfo: {
        ...prevState.UserNewInfo,
        name: event.target.value,
      },
    }));
  }

  UpdateUserEmail(event) {
    this.setState((prevState) => ({
      UserNewInfo: {
        ...prevState.UserNewInfo,
        email: event.target.value,
      },
    }));
  }

  UpdateUserBio(event) {
    this.setState((prevState) => ({
      UserNewInfo: {
        ...prevState.UserNewInfo,
        bio: event.target.value,
      },
    }));
  }

  async GetUserInfo() {
    const data = {
      Token: window.sessionStorage.getItem("token"),
    };

    await API.post("/get_user_info", data)
      .then((respone) => {
        const res = respone.data;

        if (res.ErrorMessage) {
          window.alert(res.ErrorMessage);
        }

        if (res.data) {
          this.setState((prevState) => ({
            UserInfo: res.data,
            UserNewInfo: {
              ...prevState.UserNewInfo,
              name: res.data.u_name,
              email: res.data.u_email,
              bio: res.data.u_bio,
            },
          }));
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  async DeleteUser() {
    const data = {
      u_id: this.state.UserInfo.u_id
    }

    await API.post("/remove_user", data)
      .then((respone) => {
        const res = respone.data;

        console.log(res)

        if (res.ErrorMessage) {
          window.alert(res.ErrorMessage);
        }

        if (res.data) {
          window.sessionStorage.removeItem("token")
          window.location = "/login"
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  componentDidMount() {
    this.GetUserInfo();
  }

  render() {
    return (
      <div className="profilePage">
        <div className="pageHeader">
          <div className="pageHeader-title pageHeader-title-withButton" style={{ width: "95%" }}>
            <div className="pageHeader-title-withButton-Container">
              <img src={profileIcon} style={{ width: "35px" }} alt="" />
              <div>
                <h1>Profile Page</h1>
                <p>Manage your account</p>
              </div>
            </div>
            <button className="EditProfileButton" onClick={this.ModalShow}>Edit Profile</button>
          </div>
        </div>
        <div className="profilePage-container">
          <div className="profileCardInfo">
            <label for="inputFile" id="labelInputFile">
              <img
                src={this.state.UserInfo.u_image}
                alt="user-card"
                className="profileCardInfo-image"
              />
              <div className="overlay">
                <img src={cameraIcon} width={18} alt="" />
              </div>
            </label>
            <input type="file" style={{ display: "none" }} onChange={this.convertToBase64} id="inputFile" className="profileCardInfo-fileInput" />
            <div className="profileCardInfo-content">
              <p>{this.state.UserInfo.u_name}</p>
              <p>User ID: <div style={{ marginLeft: "5px", display: "inline-block" }}>{this.state.UserInfo.u_id}</div></p>
              <p>{this.state.UserInfo.u_email}</p>
            </div>
          </div>
        </div>
        <Modal show={this.state.modal} onHide={this.ModalShow} className="ProfilePage-Modal">
          <Modal.Header closeButton>
            <Modal.Title>Edit Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="ProfilePage-inputsContainer">
              <div className="ProfilePage-inputsGroup">
                <input
                  type="text"
                  name="first-name"
                  placeholder="First name"
                  defaultValue={this.state.UserInfo.u_name}
                  pattern="[A-Za-z]"
                  className="profileCardInfo-input"
                  onChange={this.UpdateUserName}
                />
              </div>
              <div className="ProfilePage-inputsGroup">
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  defaultValue={this.state.UserInfo.u_email}
                  className="profileCardInfo-input"
                  onChange={this.UpdateUserEmail}
                />
              </div>
              <div className="ProfilePage-inputsGroup">
                <input
                  type="textarea"
                  defaultValue={this.state.UserInfo.u_bio}
                  placeholder="Bio"
                  className="profileCardInfo-input"
                  onChange={this.UpdateUserBio}
                />
              </div>
              <div className="ModalButtons" style={{ width: "95%" }}>
                <button
                  className="OkButton"
                  onClick={this.UploadNewUserInfo}
                >Edit</button>
                <button className="DeleteButton" onClick={this.DeleteModal}>Delete Profile</button>
              </div>
            </div>
          </Modal.Body>
        </Modal>

        <Modal show={this.state.deleteModal} onHide={this.DeleteModal} className="ProfilePage-Modal">
          <Modal.Header closeButton>
            <Modal.Title>Delete Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <p>Are you sure you want to delete your profile?</p>
            </Form>
            <div className="ModalButtons">
              <button
                className="DeleteButton"
                onClick={() => {
                  this.DeleteModal();
                  this.DeleteUser();
                }}
              >Delete</button>
              <button className="CancelButton" onClick={this.DeleteModal}>Cancel</button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
