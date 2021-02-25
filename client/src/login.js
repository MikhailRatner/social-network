import { Link } from "react-router-dom";
import { useStatefulFields } from "./useStatefulFields";
import useAuthSubmit from "./useAuthSubmit";

export default function Login() {
    const [values, handleChange] = useStatefulFields();
    const [error, handleSubmit] = useAuthSubmit("/login", values);

    return (
        <div className="loginComponent">
            {/* this is the syntax for conditions, IF left is true, then the thing after && is executed */}
            {error && <p>{error}</p>}
            <h1>Login</h1>
            {/* strategy #2 of binding: arrow functions! Do not forget the () after the function name! */}
            <input
                onChange={handleChange}
                name="email"
                type="text"
                placeholder="email"
            />
            <input
                onChange={handleChange}
                name="password"
                type="password"
                placeholder="password"
            />
            <button onClick={handleSubmit}>submit</button>
            <Link to="/">Register!</Link>
            <Link to="/reset-password">Reset Password!</Link>
        </div>
    );
}

/* CLASS COMPONENT OF LOGIN BELOW!!! ABOVE I REMADE IT TO A FUNCTION COMPONENT WITH HOOKS!

import { Component } from "react";

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            error: false,
        };
    }

    //1. we need to sotre the user's input in state
    //2. when user clicks "submit" we need to take the input we got from the user
    //and send it off to the server in a 'POST' request

    handleClick() {
        //console.log("click!");
        //1. send the user's input off to the server (in a POST)
        // remaining tasks: make the red underlines go away!

        if (this.state.email == "" || this.state.password == "") {
            this.setState({
                err: true,
            });
        } else {
            axios
                .post("/login", this.state)
                .then((resp) => {
                    console.log("resp from server: ", resp);
                    if (!resp.data.error) {
                        location.replace("/");
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
                            "Either your email is already registered or your password is wrong",
                    });
                });
        }
    }

    // this is how we handle user input in React!
    handleChange(e) {
        //console.log("e.target.value: ", e.target.value);
        //console.log("e.target.name: ", e.target.name); //tells us which input field the user is typing in
        //this.setState is used to put/update state!

        this.setState(
            {
                [e.target.name]: e.target.value,
            },
            () => console.log("this.state: ", this.state)
        );
    }

    render() {
        return (
            <div>
                // this is the syntax for conditions, IF left is true, then the thing after && is executed
                {this.state.error && <p>{this.state.error}</p>}
                <h1>Login</h1>
                // strategy #2 of binding: arrow functions! Do not forget the () after the function name!
                <input
                    onChange={(e) => this.handleChange(e)}
                    name="email"
                    type="text"
                    placeholder="email"
                />
                <input
                    onChange={(e) => this.handleChange(e)}
                    name="password"
                    type="password"
                    placeholder="password"
                />
                <button onClick={() => this.handleClick()}>submit</button>
                <Link to="/">Register!</Link>
                <Link to="/reset-password">Reset Password!</Link>
            </div>
        );
    }
}
 */
