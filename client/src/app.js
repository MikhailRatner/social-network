import Component from "react";
import Logo from "./logo";
import ProfilePic from "./profile-pic";
import Uploader from "./uploader";
import axios from "./axios";

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderVisible: true,
        };
    }

    componentDidMount() {
        //TODO: Fetch current users's data from the database
        //TODO: Once you get the data back, set it to the state

        console.log("COMPONENT MOUNTER");
        this.setState({});
    }

    toggleUploader() {
        this.setState({
            uploaderVisible: !this.state.uploaderVisible,
        });
    }

    render() {
        return (
            <div className="app">
                <Logo />
                <ProfilePic />
                <Uploader />
            </div>
        );
    }
}
