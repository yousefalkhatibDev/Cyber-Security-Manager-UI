import React from "react";
import API from "../helper/API";
import ReactLoading from "react-loading";

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

    // this.setState({ loading: true });

    await API.post("/login", data)
      .then((respone) => {
        const res = respone.data;
        if (res.data) {
          // this.setState({ loading: false });
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
              <span
                style={{
                  color: "#324ab2",
                  fontWeight: "bold",
                  fontSize: "2.5rem",
                }}
              >
                CYBER
              </span>
              <span style={{ fontSize: "2.5rem" }}>JO</span>
            </h1>
            <p className="ErrorMessage">{this.state.error}</p>
            <div>
              <input
                id="user-name"
                name="user-name"
                placeholder="Email"
                type="text"
                onChange={this.UpdateEmail}
              />
              <input
                id="password"
                name="password"
                placeholder="Password"
                type="password"
                onChange={this.UpdatePassword}
              />
              <br />
              <div className="LoginButton" onClick={this.Login}>
                Log in
              </div>
              <br />
            </div>
          </form>
        )}
      </div>
    );
  }
}

export default Login;
