//thiw will contain all of our action creators
//an action creator is afunction that returns an object

import axios from "./Axios";

export async function receiveAllFriends() {
    //console.log("userId WITHIN receiveWannabeFriends", userId);
    //we can OPTIONALLY "talk" to the server here...
    const { data } = await axios.get(`/get-friends`);
    //we always return an object that is our action
    console.log("DATA WITHIN receiveWannabeFriends", data);
    return {
        type: "RECEIVE_ALL_FRIENDS",
        payload: data,
    };
}

export async function acceptFriendRequest(otherId) {
    //console.log("userId WITHIN receiveWannabeFriends", userId);
    //we can OPTIONALLY "talk" to the server here...
    let buttonText = "Accept Friend Request";
    const { data } = await axios.post(`/friendstatus/${otherId}`, {
        text: buttonText,
    });
    //we always return an object that is our action
    console.log("DATA WITHIN acceptFriendRequest", data);
    return {
        type: "ACCEPT_FRIEND_REQUEST",
        payload: data,
    };
}

export async function endFriendship(otherId) {
    //console.log("userId WITHIN receiveWannabeFriends", userId);
    //we can OPTIONALLY "talk" to the server here...
    let buttonText = "End Friendship";
    const { data } = await axios.post(`/friendstatus/${otherId}`, {
        text: buttonText,
    });
    //we always return an object that is our action
    console.log("DATA WITHIN endFriendship", data);
    return {
        type: "END_FRIENDSHIP",
        payload: data,
    };
}

export async function chatMessages(msgs) {
    console.log("INSIDE chatMessages: ", msgs);
    //we can OPTIONALLY "talk" to the server here...
    //NOT NEEDED HERE!!!
    //we always return an object that is our action

    try {
        return {
            type: "GET_MESSAGES",
            payload: msgs,
        };
    } catch (err) {
        console.log("ERR in chatMessages: ", err);
    }
}

export async function chatMessage(msg) {
    console.log("INSIDE chatMessage: ", msg);
    //we can OPTIONALLY "talk" to the server here...
    //NOT NEEDED HERE!!!
    //we always return an object that is our action

    try {
        return {
            type: "GET_MESSAGE",
            payload: msg,
        };
    } catch (err) {
        console.log("ERR in chatMessage: ", err);
    }
}
