export default function ProfilePic(props) {
    //console.log("PROPS PROFILE PIC:", props);

    return (
        <div onClick={props.toggleUploader} className="profile-pic">
            <img
                width="70px"
                src={props.profilePicUrl || "default.png"}
                alt={`${props.firstName} ${props.lastName}`}
            />
        </div>
    );
}
