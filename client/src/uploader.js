import { Component } from "react";

export class Uploader extends Component {
    submit() {
        const formData = new FormData();

        //formData.append("profilePic", this.state)
        //Axios request
    }

    render() {
        return (
            <div className="uploader">
                <input type="file" />
                <button onClick={this.submit}>Upload</button>
            </div>
        );
    }
}
