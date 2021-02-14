import { Component } from "react";
import axios from "./Axios";
import { Link } from "react-router-dom";

export default class ResetPassword extends Component {
    constructor() {
        super();
        this.state = {
            renderView: 1,
            error: false,
        };
    }

    sendCode() {
        if (this.state.email == "") {
            this.setState({
                err: true,
            });
        } else {
            axios
                .post("/password/reset/start", this.state)
                .then((resp) => {
                    console.log("resp from server: ", resp);
                    if (!resp.data.error) {
                        this.setState({ renderView: 2 });
                    } else {
                        this.setState({
                            error: resp.data.error,
                        });
                    }
                })
                .catch((err) => {
                    console.log("err in registration: ", err);
                    this.setState({
                        error: "This email is not registered with us.",
                    });
                });
        }
    }

    verifyCode() {
        axios
            .post("/password/reset/verify", this.state)
            .then((resp) => {
                console.log("resp from server: ", resp);
                if (!resp.data.error) {
                    this.setState({ renderView: 3 });
                } else {
                    this.setState({
                        error: resp.data.error,
                    });
                }
            })
            .catch((err) => {
                console.log("err in registration: ", err);
                this.setState({
                    error:
                        "The code you entered does not correspond with the code you received",
                });
            });
    }

    handleChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value,
            },
            () => console.log("this.state: ", this.state)
        );
    }

    determineWhichViewToRender() {
        // this method determines what the render!
        if (this.state.renderView === 1) {
            return (
                <div>
                    <p>
                        Please enter the email address with which you registered
                    </p>
                    <form>
                        <input
                            onChange={(e) => this.handleChange(e)}
                            name="email"
                            type="text"
                            placeholder="email"
                        />
                    </form>
                    <button onClick={() => this.sendCode()}>submit</button>
                    <Link to="/registration">Register </Link>
                    <Link to="/login">or Login</Link>
                </div>
            );
        } else if (this.state.renderView === 2) {
            return (
                <div>
                    <input
                        onChange={(e) => this.handleChange(e)}
                        name="code"
                        type="text"
                        placeholder="code"
                    />
                    <input
                        onChange={(e) => this.handleChange(e)}
                        name="password"
                        type="password"
                        placeholder="password"
                    />
                    <button onClick={() => this.verifyCode()}>submit</button>
                </div>
            );
        } else if (this.state.renderView === 3) {
            return (
                <div>
                    <h1>success</h1>
                    <p>You can now log in with your new password!</p>
                    <Link to="/login">Click here to login</Link>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                <h1>Reset Password</h1>
                {this.state.error && <p>{this.state.error}</p>}

                {/* call the method */}
                {this.determineWhichViewToRender()}
            </div>
        );
    }
}
