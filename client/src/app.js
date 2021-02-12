import { Component } from "react";
import Logo from "./logo";
import ProfilePic from "./profile-pic";
import Uploader from "./uploader";
import axios from "./axios";

export default class App extends Component {
    constructor(props) {
        super(props);

        // Initialize App's state
        this.state = {
            uploaderVisible: false,
            id: "",
            first: "",
            last: "",
            profilePicUrl: "",

            // TODO: Bind methods if needed
        };
    }

    async componentDidMount() {
        // Special React Lifecycle Method
        console.log("COMPONENT STARTS MOUNTING");

        // TODO: Make an axios request to fetch the user's data when the component mounts
        const { data } = await axios.get("/user");

        // TODO: update the state when the data is retrieved
        this.setState({
            id: data.id,
            first: data.first,
            last: data.last,
            profilePicUrl: data.profilePicUrl,
        });

        console.log("COMPONENT ENDS MOUNTING");
    }

    toggleUploader() {
        this.setState({
            uploaderVisible: !this.state.uploaderVisible,
        });
    }

    updateProfilePic(imgUrl) {
        // TODO: Updates the "profilePicUrl" in the state
        // TODO: Hides the uploader
        console.log("updateProfilePic RUNS!");
        console.log("IMG URL: ", imgUrl);
        this.setState({
            profilePicUrl: imgUrl,
            uploaderVisible: false,
        });
        console.log("updateProfilePic DONE!");
    }

    render() {
        return (
            <div className={"app"}>
                <Logo />
                <ProfilePic
                    // Passing down props:
                    firstName={this.state.first}
                    lastName={this.state.last}
                    profilePicUrl={this.state.profilePicUrl}
                    // Passing down methods as standard functions (binding needed):
                    toggleUploader={() => this.toggleUploader()}
                />
                {/*Conditionally render the Uploader: */}
                {this.state.uploaderVisible && (
                    <Uploader updateProfilePic={this.updateProfilePic} />
                )}
            </div>
        );
    }
}
