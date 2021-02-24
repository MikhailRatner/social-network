export function reducer(state = {}, action) {
    if (action.type === "RECEIVE_ALL_FRIENDS") {
        //update the state object...
        //spread operator, slice, filter, map are ways to COPY the object/array without mutating it
        //good array method for unfriend. FILTER method
        //good array method for accept: MAP method

        state = {
            ...state,
            allFriends: action.payload,
        };

        //console.log("NEW STATE IN RECEIVE_ALL_FRIENDS:", state);
    }

    if (action.type === "ACCEPT_FRIEND_REQUEST") {
        //update the state object...
        //spread operator, slice, filter, map are ways to COPY the object/array without mutating it
        //good array method for unfriend. FILTER method
        //good array method for accept: MAP method

        state = {
            ...state,
            accept: action.payload,
        };

        console.log("NEW STATE IN ACCEPT_FRIEND_REQUEST:", state);
    }

    if (action.type === "END_FRIENDSHIP") {
        //update the state object...
        //spread operator, slice, filter, map are ways to COPY the object/array without mutating it
        //good array method for unfriend. FILTER method
        //good array method for accept: MAP method

        state = {
            ...state,
            end: action.payload,
        };

        console.log("NEW STATE IN END_FRIENDSHIP:", state);
    }

    if (action.type === "GET_MESSAGES") {
        //update the state object...
        //spread operator, slice, filter, map are ways to COPY the object/array without mutating it
        //good array method for unfriend. FILTER method
        //good array method for accept: MAP method

        state = {
            ...state,
            lastMessages: action.payload,
        };

        //console.log("NEW STATE IN RECEIVE_ALL_FRIENDS:", state);
    }

    if (action.type === "POST_MESSAGE") {
        //update the state object...
        //spread operator, slice, filter, map are ways to COPY the object/array without mutating it
        //good array method for unfriend. FILTER method
        //good array method for accept: MAP method

        state = {
            ...state,
            postMessage: action.payload,
        };

        //console.log("NEW STATE IN RECEIVE_ALL_FRIENDS:", state);
    }

    return state;
}
