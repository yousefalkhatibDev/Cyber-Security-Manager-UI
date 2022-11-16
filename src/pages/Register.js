import React from "react";
import API from "../helper/API";
import ReactLoading from "react-loading";
import emailIcon from "../icons/email.svg"
import lockIcon from "../icons/lock.svg"
import profileIcon from "../icons/profile.svg"
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["PDF", "PNG", "GIF", "JPEG", "TIFF", "PSD", "EPS", "AI"];

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            bio: "",
            imageBase64: "",
            error: "",
            loading: false,
        };

        this.Register = this.Register.bind(this);
        this.UpdateUsername = this.UpdateUsername.bind(this);
        this.UpdateEmail = this.UpdateEmail.bind(this);
        this.UpdateBio = this.UpdateBio.bind(this);
        this.UpdatePassword = this.UpdatePassword.bind(this);
        this.UpdateBase64 = this.UpdateBase64.bind(this)
        this.ConvertToBase64 = this.ConvertToBase64.bind(this)
    }

    UpdateBase64(base64) {
        this.setState({ imageBase64: base64 })
    }

    ConvertToBase64(file) {
        //Check File is not Empty
        if (file) {
            // FileReader function for read the file.

            const fileReader = new FileReader();
            var self = this;
            // Onload of file read the file content
            fileReader.onload = async function (fileLoadedEvent) {
                let base64 = fileLoadedEvent.target.result;
                self.UpdateBase64(base64);
            };
            // // Convert data to base64
            fileReader.readAsDataURL(file);
        }
    }

    UpdateUsername(event) {
        this.setState({
            username: event.target.value,
        });
    }

    UpdateEmail(event) {
        this.setState({
            email: event.target.value,
        });
    }

    UpdateBio(event) {
        this.setState({
            bio: event.target.value,
        });
    }

    UpdatePassword(event) {
        this.setState({
            password: event.target.value,
        });
    }

    async Register() {
        if (this.state.email === "" || this.state.username === "" || this.state.imageBase64 === "" || this.state.bio === "" || this.state.password === "") {
            return this.setState({ error: "please fill up all the forms" })
        }

        const data = {
            UserEmail: this.state.email,
            UserName: this.state.username,
            UserImage: this.state.imageBase64,
            UserBio: this.state.bio,
            UserPassword: this.state.password,
        };

        this.setState({ loading: true });

        await API.post("/register", data)
            .then((respone) => {
                const res = respone.data;

                if (res.ErrorMessage) {
                    window.alert(res.ErrorMessage);
                }

                if (res.data) {
                    this.setState({ loading: false });
                    // window.sessionStorage.setItem("token", res.data);
                    window.location = "/";
                } else {
                    this.setState({ error: "Error registering user" });
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
                            Sign Up
                        </h1>
                        <p className="ErrorMessage">{this.state.error}</p>
                        <div>
                            <div className="inputLoginContainer">
                                <img src={profileIcon} alt="" />
                                <input
                                    id="userName"
                                    name="userName"
                                    placeholder="Username"
                                    type="text"
                                    onChange={this.UpdateUsername}
                                />
                            </div>
                            <div className="inputLoginContainer">
                                <img src={emailIcon} alt="" />
                                <input
                                    id="email"
                                    name="email"
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
                            <div className="inputLoginContainer">
                                <img src={lockIcon} id="textarea" alt="" />
                                <textarea
                                    id="bio"
                                    name="bio"
                                    placeholder="Bio"
                                    onChange={this.UpdateBio}
                                />
                            </div>
                            <div className="dragAndDrop">
                                <p>Profile Image</p>
                                <FileUploader handleChange={this.ConvertToBase64} name="file" types={fileTypes} />
                            </div>
                            <br />
                            <div className="LoginButton" onClick={this.Register}>
                                Sign Up
                            </div>
                            <br />
                            <div className="LinkContainer">
                                <p>Already have an account? <a href="/login">Sign In</a></p>
                            </div>
                        </div>
                    </form>
                )}
            </div>
        );
    }
}

export default Login;
