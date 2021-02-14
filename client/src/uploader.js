import { Component } from "react";
import axios from "./Axios";

export default class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            file: null,
        };
        //console.log("PROPS: ", props);
    }

    handleChange(e) {
        //console.log("HANDLE CHANGE STARTS");
        //console.log("E", e);
        this.setState({
            file: e.target.files[0],
        });
    }

    async uploadImg() {
        const formData = new FormData();
        formData.append("file", this.state.file);
        //console.log(this.state.file);
        //console.log("formData:", formData);

        try {
            const { data } = await axios.post("/profile-pic", formData);
            //console.log("DATA FROM uploadImg response: ", data);

            //TODO: Update the state of App with the new ProfilePic once available
            await this.props.updateProfilePic(data);
            return;
            //this.setState({ file: data });
        } catch (err) {
            console.log("err in Upload Image", err);
            this.setState({
                error: "Something went wrong with the upload.",
            });
        }
    }

    render() {
        return (
            <div className="uploader">
                <input type="file" onChange={(e) => this.handleChange(e)} />
                <button onClick={() => this.uploadImg()}>Upload</button>
            </div>
        );
    }
}
