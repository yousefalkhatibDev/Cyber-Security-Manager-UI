import React from "react";
import API from "../helper/API";
import emailIcon from "../icons/email.svg"
import lockIcon from "../icons/lock.svg"
import reconLogo from "../imgs/recon-logo-text.png"

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
    };

    this.Login = this.Login.bind(this);
    this.UpdateEmail = this.UpdateEmail.bind(this);
    this.UpdatePassword = this.UpdatePassword.bind(this);
  }

  UpdateEmail(event) {
    this.setState({
      email: event.target.value,
      error: ""
    });
  }

  UpdatePassword(event) {
    this.setState({
      password: event.target.value,
      error: ""
    });
  }

  async Login() {
    const data = {
      Email: this.state.email,
      Password: this.state.password,
    };

    await API.post("/login", data)
      .then((respone) => {
        const res = respone.data;

        if (res.ErrorMessage) {
          window.alert(res.ErrorMessage);
        }

        console.log(res.data)

        if (res.data) {
          window.sessionStorage.setItem("token", res.data);
          window.location = "/";
        } else {
          this.setState({ error: "Invalid Email or Password" });
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  render() {
    return (
      <div className="Login">
        <form action="index.html" method="post">
          <div className="logoContainer">
            <img src={reconLogo} />
          </div>
          <p className="ErrorMessage">{this.state.error}</p>
          <div>
            <div className="inputLoginContainer">
              <img src={emailIcon} alt="" />
              <input
                id="user-name"
                name="user-name"
                placeholder="Email"
                type="text"
                onChange={this.UpdateEmail}
              />
            </div>
            <div className="inputLoginContainer">
              <img src={lockIcon} alt="" />
              <input
                id="password"
                name="password"
                placeholder="Password"
                type="password"
                onChange={this.UpdatePassword}
              />
            </div>
            <br />
            <div className="LoginButton" onClick={this.Login}>
              Sign In
            </div>
            <br />
            <div className="LinkContainer">
              <p>Don't have an account? <a href="/register">Sign Up</a></p>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
