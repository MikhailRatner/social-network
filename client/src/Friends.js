import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    receiveAllFriends,
    acceptFriendRequest,
    endFriendship,
} from "./actions";

export default function Friends() {
    //console.log("PROPS INSIDE Friends component", props);

    const dispatch = useDispatch();
    const wannabeFriends = useSelector(
        (state) =>
            state.allFriends &&
            state.allFriends.filter((allFriends) => !allFriends.accepted)
    );
    const currentFriends = useSelector(
        (state) =>
            state.allFriends &&
            state.allFriends.filter((allFriends) => allFriends.accepted)
    );

    // console.log("wannabeFriends 1", wannabeFriends);
    // console.log("currentFriends 1", currentFriends);
    // const [wannabeFriends, setwannabeFriends] = useState([]);
    // const [currentFriends, setcurrentFriends] = useState([]);

    useEffect(() => {
        dispatch(receiveAllFriends());
        return () => {
            //cleanup;
        };
    }, []);

    return (
        <div className="friends">
            <h2>Wannabe Friends</h2>
            {wannabeFriends &&
                wannabeFriends.map((elem, index) => {
                    return (
                        <div key={index}>
                            <img
                                width="70px"
                                src={elem.profile_pic_url}
                                alt={`${elem.first} ${elem.last}`}
                            />
                            <p>
                                {elem.first} {elem.last}
                            </p>
                            <button
                                onClick={() =>
                                    dispatch(acceptFriendRequest(elem.id))
                                }
                            >
                                Accept Friend Request
                            </button>
                        </div>
                    );
                })}
            <h2>Current Friends</h2>
            {currentFriends &&
                currentFriends.map((elem, index) => {
                    return (
                        <div key={index}>
                            <img
                                width="70px"
                                src={elem.profile_pic_url}
                                alt={`${elem.first} ${elem.last}`}
                            />
                            <p>
                                {elem.first} {elem.last}
                            </p>
                            <button
                                onClick={() => dispatch(endFriendship(elem.id))}
                            >
                                End Friendship
                            </button>
                        </div>
                    );
                })}
        </div>
    );
}
