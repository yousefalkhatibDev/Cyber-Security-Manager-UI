import React from "react";
import API from "../helper/API";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
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

    await API.post("/login", data)
      .then((respone) => {
        const res = respone.data;
        if (res.data) {
          window.sessionStorage.setItem("ID", res.data);
          window.location = "/";
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  render() {
    return (
      <div className="dashboard">
        <h2>login</h2>
        <input type="email" onChange={this.UpdateEmail} />
        <input type="password" onChange={this.UpdatePassword} />
        <button onClick={this.Login}>login</button>
      </div>
    );
  }
}

export default Login;
