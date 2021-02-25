import { Component } from "react";
import axios from "./Axios";
import Button from "react-bootstrap/Button";

export default class BioEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editingMode: false,
            error: false,
        };
    }

    toggleEditor() {
        console.log("INSIDE TOGGLE EDITOR");

        this.setState({
            editingMode: 2,
        });
    }

    // this is how we handle user input in React!
    handleChange(e) {
        //console.log("e.target.value: ", e.target.value);
        //console.log("e.target.name: ", e.target.name); //tells us which input field the user is typing in
        //this.setState is used to put/update state!

        //console.log("THIS PROPS BIO", this.props.bio);

        this.setState(
            {
                [e.target.name]: e.target.value,
            },
            () => console.log("this.state: ", this.state)
        );
    }

    async updateBio() {
        if (this.state.biography == "") {
            this.setState({
                err: true,
            });
        } else {
            try {
                const { data } = await axios.post("/update-bio", this.state);
                console.log("data from server: ", data);

                if (!data.error) {
                    this.setState({ editingMode: 1, biography: data });
                    console.log("NEW BIO IS", data);
                } else {
                    this.setState({
                        error: data.error,
                    });
                }
            } catch (err) {
                console.log("err in registration: ", err);
                this.setState({
                    error: "Something went wrong with updating your bio.",
                });
            }
        }
    }

    determineWhichModeToRender() {
        // this method determines what the render!
        if (this.state.editingMode == false && !this.props.bio) {
            return (
                <div>
                    <button onClick={() => this.toggleEditor()}>ADD BIO</button>
                </div>
            );
        } else if (this.state.editingMode == 2) {
            return (
                <div>
                    <textarea
                        onChange={(e) => this.handleChange(e)}
                        name="biography"
                        id="textAreaProfile"
                        cols="30"
                        rows="10"
                        value={this.state.biography || this.props.bio}
                    ></textarea>
                    <button onClick={() => this.updateBio()}>SAVE</button>
                </div>
            );
        } else if (this.props.bio || this.state.biography) {
            return (
                <div>
                    <p>{this.state.biography || this.props.bio}</p>
                    <button onClick={() => this.toggleEditor()}>
                        EDIT BIO
                    </button>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}

                {/* call the method */}
                {this.determineWhichModeToRender()}
            </div>
        );
    }
}
/* 
                <h1>Render Mode {this.state.editingMode}</h1>
                <p>This is the bio: {this.state.bio}</p> */
