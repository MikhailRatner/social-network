import { Component } from "react";
import axios from "./Axios";
import ProfilePic from "./Profile-pic";

export default class OtherProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {
        //console.log("this.props: ", this.props);
        //console.log("this.props.match: ", this.props.match);
        //console.log("id: ", this.props.match.params.id);
        // we should  make a request to our server to get the other user's data using the id
        // If we are trying to view our own profile,
        // we should make sure to send the user back to the '/' route

        let otherId = this.props.match.params.id;

        const { data } = await axios.get(`/api/user/${otherId}`);
        console.log("DATA FROM OTHER PROFILE: ", data);

        if (data.same || !data) {
            this.props.history.push("/");
        }

        /*         if (this.props.match.params.id == 34) {
            this.props.history.push("/");
        } */

        this.setState({
            firstName: data.first,
            lastName: data.last,
            profilePicUrl: data.profile_pic_url,
            bio: data.bio,
        });
        //console.log("THIS.STATE:", this.state);
    }

    render() {
        return (
            <div className="otherProfile">
                <div className="otherProfileImgAndText">
                    <ProfilePic
                        // Passing down props:
                        firstName={this.state.firstName}
                        lastName={this.state.lastName}
                        profilePicUrl={this.state.profilePicUrl}
                    />
                    <p>
                        {this.state.firstName} {this.state.lastName}
                    </p>
                </div>
                <div className="otherProfileBio">
                    <p>{this.state.bio}</p>
                </div>
            </div>
        );
    }
}
