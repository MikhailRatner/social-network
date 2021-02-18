//thiw will contain all of our action creators
//an action creator is afunction that returns an object

import axios from "axios";

export async function myFirstActionCreators() {
    //we can OPTIONALLY "talk" to the server here...
    const { data } = await axios.get("someroute");
    //we always return an object that is our action
    return {
        type: "UPDATE_STATE_SOMEHOW",
        payload: data.userId,
    };
}
