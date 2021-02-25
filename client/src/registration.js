import { Link } from "react-router-dom";
import { useStatefulFields } from "./useStatefulFields";
import useAuthSubmit from "./useAuthSubmit";

export default function Registration() {
    const [values, handleChange] = useStatefulFields();
    const [error, handleSubmit] = useAuthSubmit("/registration", values);

    return (
        <div className="registrationComponent">
            <div>
                {/* this is the syntax for conditions, IF left is true, then the thing after && is executed */}
                {error && <p>{error}</p>}
                <h1>Registration</h1>
                {/* strategy #2 of binding: arrow functions! Do not forget the () after the function name! */}
                <input
                    onChange={handleChange}
                    name="first"
                    type="text"
                    placeholder="first"
                />
                <br />
                <input
                    onChange={handleChange}
                    name="last"
                    type="text"
                    placeholder="last"
                />
                <br />
                <input
                    onChange={handleChange}
                    name="email"
                    type="text"
                    placeholder="email"
                />
                <br />
                <input
                    onChange={handleChange}
                    name="password"
                    type="password"
                    placeholder="password"
                />
                <br />
                <button onClick={handleSubmit}>submit</button>
                <br />
                <Link to="/login">Log in!</Link>
            </div>
        </div>
    );
}

/* CLASS COMPONENT BELOW! ABOVE IS THE CHANGE FUNCTION COMPONENT WITH HOOKS
//class components have state!
// (class components also have lifecycle methods (like componentDidMount))

import { Component } from "react";
import axios from "./Axios";
import { Link } from "react-router-dom";

export default class Registration extends Component {
    constructor() {
        super();
        this.state = {
            error: false,
        };
        //strategy #1 for binding
        //this.handleChange = this.handleChange.bind(this);
    }

    //1. we need to sotre the user's input in state
    //2. when user clicks "submit" we need to take the input we got from the user
    //and send it off to the server in a 'POST' request

    handleClick() {
        //console.log("click!");
        //1. send the user's input off to the server (in a POST)
        // remaining tasks: make the red underlines go away!

        if (
            this.state.first == "" ||
            this.state.last == "" ||
            this.state.email == "" ||
            this.state.password == ""
        ) {
            this.setState({
                err: true,
            });
        } else {
            axios
                .post("/registration", this.state)
                .then((resp) => {
                    console.log("resp from server: ", resp);
                    if (resp.data) {
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
                //this is the syntax for conditions, IF left is true, then the thing after && is executed
                {this.state.error && <p>{this.state.error}</p>}
                <h1>Registration</h1>
                //strategy #2 of binding: arrow functions! Do not forget the () after the function name!
                <input
                    onChange={(e) => this.handleChange(e)}
                    name="first"
                    type="text"
                    placeholder="first"
                />
                <input
                    onChange={(e) => this.handleChange(e)}
                    name="last"
                    type="text"
                    placeholder="last"
                />
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
                <Link to="/login">Log in!</Link>
            </div>
        );
    }
}

*/
