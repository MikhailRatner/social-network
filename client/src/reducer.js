export function reducer(state = {}, action) {
    if (action.type === "RECEIVE_ALL_FRIENDS") {
        //update the state object...
        //spread operator, slice, filter, map are ways to COPY the object/array without mutating it
        //good array method for unfriend. FILTER method
        //good array method for accept: MAP method

        state = {
            ...state,
            action,
        };

        console.log("NEW STATE IN REDUCER:", state);
    }
    return state;
}
