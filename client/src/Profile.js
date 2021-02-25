import ProfilePic from "./Profile-pic";
import BioEditor from "./Bio-editor";

export default function Profile(props) {
    console.log("props in Profile: ", props);

    return (
        <div className="profile">
            <div className="myProfileInfo">
                <ProfilePic
                    // Passing down props:
                    firstName={props.firstName}
                    lastName={props.lastName}
                    profilePicUrl={props.profilePicUrl}
                    bio={props.bio}
                />
                <p>
                    {props.firstName} {props.lastName}
                </p>
            </div>
            <BioEditor bio={props.bio} />
        </div>
    );
}
