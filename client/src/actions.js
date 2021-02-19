//thiw will contain all of our action creators
//an action creator is afunction that returns an object

import axios from "axios";

export async function receiveAllFriends(userId) {
    //console.log("userId WITHIN receiveWannabeFriends", userId);
    //we can OPTIONALLY "talk" to the server here...
    const { data } = await axios.get(`/friends/${userId}`);
    //we always return an object that is our action
    console.log("DATA WITHIN receiveWannabeFriends", data);
    return {
        type: "RECEIVE_ALL_FRIENDS",
        allFriends: data,
    };
}
