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
              name: "",
              email: "",
              bio: "",
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
          this.setState({ UserInfo: res.data });
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  componentDidMount() {
    // this.GetUserInfo();
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
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
                alt="user-card"
                className="profileCardInfo-image"
              />
            </div>
            <div className="inputs-group">
              <label htmlFor="username">User ID</label>
              <input
                type="text"
                name="username"
                disabled
                defaultValue="User12345"
                className="profileCardInfo-input"
              />
            </div>
            <div className="profileCardInfo-inputsContainer">
              <div className="inputs-group">
                <label htmlFor="full-name">UserName</label>
                <input
                  type="text"
                  name="full-name"
                  defaultValue="Ahmad almuhidat"
                  className="profileCardInfo-input"
                  onChange={this.UpdateUserName}
                />
              </div>
              <div className="inputs-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  defaultValue="ahmad@cts.com"
                  className="profileCardInfo-input"
                  onChange={this.UpdateUserEmail}
                />
              </div>
              <div className="inputs-group">
                <label htmlFor="email">Email</label>
                <input
                  type="textarea"
                  defaultValue="bio"
                  className="profileCardInfo-input"
                  onChange={this.UpdateUserBio}
                />
              </div>
              <div style={{ display: "flex", width: "90%" }}>
                <Button variant="success" style={{ borderRadius: "5px" }}>
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
