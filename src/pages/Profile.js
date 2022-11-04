import React, { Component } from "react";
import { CgProfile } from "react-icons/cg";
import Button from "react-bootstrap/Button";
import API from "../helper/API";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UserInfo: {},
      UserNewInfo: {
        name: "",
        email: "",
        bio: "",
      },
    };

    this.GetUserInfo = this.GetUserInfo.bind(this);
    this.UpdateUserName = this.UpdateUserName.bind(this);
    this.UpdateUserEmail = this.UpdateUserEmail.bind(this);
    this.UpdateUserBio = this.UpdateUserBio.bind(this);
    this.UploadNewUserInfo = this.UploadNewUserInfo.bind(this);
    this.UpdateUserImage = this.UpdateUserImage.bind(this);
    this.convertToBase64 = this.convertToBase64.bind(this);
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

  componentDidMount() {
    this.GetUserInfo();
  }

  render() {
    return (
      <div className="profilePage">
        <div className="pageHeader">
          <CgProfile
            color="green"
            className="pageHeader-icon"
            textDecoration="none"
          />
          <div className="pageHeader-title">
            <h1>Profile Page</h1>
            <p>Manage your account</p>
          </div>
        </div>
        <div className="profilePage-container">
          <div className="profileCardInfo">
            <div className="profileCardInfo-imageContainer">
              <img
                src={this.state.UserInfo.u_image}
                alt="user-card"
                className="profileCardInfo-image"
              />
              <p>change profile image</p>
              <input type="file" onChange={this.convertToBase64} id="inputFile" className="profileCardInfo-fileInput" />
            </div>
            <div className="profileCardInfo-inputsContainer">
              <div className="inputs-group">
                <label htmlFor="full-name">UserName</label>
                <input
                  type="text"
                  name="full-name"
                  defaultValue={this.state.UserInfo.u_name}
                  className="profileCardInfo-input"
                  onChange={this.UpdateUserName}
                />
              </div>
              <div className="inputs-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  defaultValue={this.state.UserInfo.u_email}
                  className="profileCardInfo-input"
                  onChange={this.UpdateUserEmail}
                />
              </div>
              <div className="inputs-group">
                <label htmlFor="username">User ID</label>
                <input
                  type="text"
                  name="username"
                  disabled
                  defaultValue={this.state.UserInfo.u_id}
                  className="profileCardInfo-input"
                />
              </div>
              <div className="inputs-group">
                <label htmlFor="email">Bio</label>
                <input
                  type="textarea"
                  defaultValue={this.state.UserInfo.u_bio}
                  className="profileCardInfo-input"
                  onChange={this.UpdateUserBio}
                />
              </div>
              <div style={{ display: "flex", width: "90%" }}>
                <Button
                  variant="success"
                  style={{ borderRadius: "5px" }}
                  onClick={this.UploadNewUserInfo}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
