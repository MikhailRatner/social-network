// src./registration.js

//class components have state!
// (class components also have lifecycle methods (like componentDidMount))

import { Component } from "react";
import axios from "axios";

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
                    if (resp.data.id) {
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
                        error: true,
                    });
                    // render an error message
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
                {/* this is the syntax for conditions, IF left is true, then the thing after && is executed */}
                {this.state.error && <p>Something broke :()</p>}
                <h1>Registration</h1>
                {/* strategy #2 of binding: arrow functions! Do not forget the () after the function name! */}
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
            </div>
        );
    }
}
