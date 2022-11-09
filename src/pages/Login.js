import React from "react";
import API from "../helper/API";
import ReactLoading from "react-loading";
import emailIcon from "../icons/email.svg"
import lockIcon from "../icons/lock.svg"

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
      loading: false,
    };

    this.Login = this.Login.bind(this);
    this.UpdateEmail = this.UpdateEmail.bind(this);
    this.UpdatePassword = this.UpdatePassword.bind(this);
  }

  UpdateEmail(event) {
    this.setState({
      email: event.target.value,
    });
  }

  UpdatePassword(event) {
    this.setState({
      password: event.target.value,
    });
  }

  async Login() {
    const data = {
      Email: this.state.email,
      Password: this.state.password,
    };

    this.setState({ loading: true });

    await API.post("/login", data)
      .then((respone) => {
        const res = respone.data;

        if (res.ErrorMessage) {
          window.alert(res.ErrorMessage);
        }

        if (res.data) {
          this.setState({ loading: false });
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
        {this.state.loading === true ? (
          <ReactLoading
            type={"bars"}
            color={"#324ab2"}
            height={100}
            width={100}
          />
        ) : (
          <form action="index.html" method="post">
            <h1>
              Sign In
            </h1>
            <p className="ErrorMessage">{this.state.error}</p>
            <div>
              <div className="inputLoginContainer">
                <img src={emailIcon} />
                <input
                  id="user-name"
                  name="user-name"
                  placeholder="Email"
                  type="text"
                  onChange={this.UpdateEmail}
                />
              </div>
              <div className="inputLoginContainer">
                <img src={lockIcon} />
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
                <p>Don't have an account? <a href="#">Sign Up</a></p>
              </div>
            </div>
          </form>
        )}
      </div>
    );
  }
}

export default Login;
