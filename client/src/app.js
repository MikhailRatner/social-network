import { Component } from "react";
import Logo from "./Logo";
import ProfilePic from "./Profile-pic";
import Uploader from "./Uploader";
import Profile from "./Profile";
import axios from "./Axios";
import { BrowserRouter, Route } from "react-router-dom";
import OtherProfile from "./OtherProfile";
import FindPeople from "./FindPeople";

export default class App extends Component {
    constructor(props) {
        super(props);

        // Initialize App's state
        this.state = {
            uploaderVisible: false,
            // id: "",
            // first: "",
            // last: "",
            // profilePicUrl: "",
        };
        // TODO: Bind methods if needed
        //this.updateProfilePic = this.updateProfilePic.bind(this);
    }

    async componentDidMount() {
        // Special React Lifecycle Method
        //console.log("COMPONENT STARTS MOUNTING");

        // TODO: Make an axios request to fetch the user's data when the component mounts
        const { data } = await axios.get("/user");

        // TODO: update the state when the data is retrieved
        this.setState({
            id: data.id,
            firstName: data.first,
            lastName: data.last,
            profilePicUrl: data.profile_pic_url,
            bio: data.bio,
        });

        //console.log("COMPONENT ENDS MOUNTING");
    }

    toggleUploader() {
        this.setState({
            uploaderVisible: !this.state.uploaderVisible,
        });
    }

    updateProfilePic(imgUrl) {
        // TODO: Updates the "profilePicUrl" in the state
        // TODO: Hides the uploader
        //console.log("updateProfilePic RUNS!");
        //console.log("IMG URL: ", imgUrl);
        this.setState({
            profilePicUrl: imgUrl,
            uploaderVisible: false,
        });
        //console.log("updateProfilePic DONE!");
    }

    render() {
        return (
            <BrowserRouter>
                <div className={"app"}>
                    <div className={"header"}>
                        <Logo />
                        <ProfilePic
                            // Passing down props:
                            firstName={this.state.firstName}
                            lastName={this.state.lastName}
                            profilePicUrl={this.state.profilePicUrl}
                            bio={this.state.bio}
                            // Passing down methods as standard functions (binding needed):
                            toggleUploader={() => this.toggleUploader()}
                        />
                        {/*Conditionally render the Uploader: */}
                        {this.state.uploaderVisible && (
                            <Uploader
                                updateProfilePic={(imgUrl) =>
                                    this.updateProfilePic(imgUrl)
                                }
                            />
                        )}
                    </div>

                    <div>
                        <Route
                            exact
                            path="/"
                            render={() => (
                                <Profile
                                    id={this.state.id}
                                    firstName={this.state.firstName}
                                    lastName={this.state.lastName}
                                    profilePicUrl={this.state.profilePicUrl}
                                    onClick={this.toggleUploader}
                                    bio={this.state.bio}
                                />
                            )}
                        />
                        <Route
                            path="/user/:id"
                            render={(props) => (
                                <OtherProfile
                                    key={props.match.url}
                                    match={props.match}
                                    history={props.history}
                                />
                            )}
                        />
                        <Route
                            path="/users"
                            render={(props) => (
                                <FindPeople
                                    key={props.match.url}
                                    match={props.match}
                                    history={props.history}
                                />
                            )}
                        />
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

/* from Profile route
    setBio={this.setBio}
*/
