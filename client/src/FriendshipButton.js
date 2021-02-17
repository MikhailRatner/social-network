import { useState, useEffect } from "react";
import axios from "./Axios";

//import submitFriendRequest from "./SubmitFriendRequest";

export default function FriendshipButton(props) {
    // needs to get passed the id of the user that we are currently viewing
    // console.log("INSIDE FRIENDSHIP BUTTON, PROPS: ", props);

    let userId = props.userId;
    let otherId = props.otherId;

    // we will either want to befriend that user, cancel a request we made in the past,
    // accept a pending friend request, or end our friendship
    // the id of the other user lives in the OtherProfile component

    const [buttonText, setbuttonText] = useState("Send Friend Request");
    /* const [buttonText, checkRelation, abort] = submitFriendRequest(
        userId,
        otherId
    ); */

    // in useEffect we will want to make a request to the server to find out our
    // relationship status with the user we are looking at, and send over some button text

    //with async/await
    useEffect(() => {
        let abort = false;
        // then this stuff runs SECOND
        console.log("PROPS USER ID: ", props.userId);
        console.log("PROPS OTHER ID: ", props.otherId);

        (async () => {
            try {
                const { data } = await axios.get(
                    `/friendstatus/${userId}/${otherId}`
                );
                console.log("DATA AXIOS FRIENDSTATUS:", data);
                if (!abort) {
                    setbuttonText(data);
                }
            } catch (err) {
                console.log(err);
            }
        })();
        // cleanup function
        // runs before every re-render
        return () => {
            console.log("friendstatus in returned functions");
            abort = true;
        };
    }, [userId, otherId]);

    // on submit/ btn click we want to send the button text to the server,
    //to update our db, and change the btn text again, once the DB has
    // been successfully updated

    const handleSubmit = async () => {
        console.log("REQUEST SENT");

        const { data } = await axios.post(
            `/friendstatus/${userId}/${otherId}`,
            { text: buttonText }
        );
        console.log("DATA IN HANDLE SUBMIT FRIEND REQUEST:", data);
        setbuttonText(data);
    };

    return (
        <>
            <button onClick={() => handleSubmit()} className="friendshipButton">
                {buttonText}
            </button>
        </>
    );
}