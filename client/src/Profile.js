import ProfilePic from "./Profile-pic";
import BioEditor from "./Bio-editor";

export default function Profile(props) {
    console.log("props in Profile: ", props);

    return (
        <div className="profile">
            <ProfilePic
                // Passing down props:
                firstName={props.firstName}
                lastName={props.lastName}
                profilePicUrl={props.profilePicUrl}
                bio={props.bio}
            />
            <p>
                Hey, my name is {props.firstName} {props.lastName} and I am new
                at this cool social media network!
            </p>
            <BioEditor bio={props.bio} />
        </div>
    );
}
