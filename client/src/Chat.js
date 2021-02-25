import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { socket } from "./socket";

export default function Chat() {
    //console.log("PROPS INSIDE Chat component", props);

    const chat = useSelector((state) => state.lastMessages);
    const [inputValue, setInputValue] = useState("");
    const elemRef = useRef();

    // console.log("wannabeFriends 1", wannabeFriends);
    // console.log("currentFriends 1", currentFriends);
    // const [wannabeFriends, setwannabeFriends] = useState([]);
    // const [currentFriends, setcurrentFriends] = useState([]);

    useEffect(() => {
        if (chat) {
            console.log("CHAT in useEffect: ", chat);
            elemRef.current.scrollTop =
                elemRef.current.scrollHeight - elemRef.current.clientHeight;
        }
        return () => {
            //cleanup;
        };
    }, [chat]);

    const sendMessage = function (e) {
        if (e.key === "Enter" || e.type === "click") {
            //var date = new Date();
            console.log("CLICKED OR ENTER", e);
            socket.emit("sendMessage", inputValue);
            e.target.value = "";
        }
    };

    return (
        <div className="chatDiv">
            <h2>Last Ten Group Messages</h2>
            <div id="chat-messages" ref={elemRef}>
                {chat &&
                    chat.map((elem, index) => {
                        return (
                            <div key={index} className="oneChatMessage">
                                <img
                                    width="20px"
                                    src={elem.profile_pic_url}
                                    alt={`${elem.first} ${elem.last}`}
                                />

                                <p>
                                    <strong>
                                        {elem.first} {elem.last}
                                    </strong>
                                </p>

                                <p>{elem.message}</p>
                            </div>
                        );
                    })}
            </div>
            <textarea
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => sendMessage(e)}
                name="chatTextarea"
                id="chatTextarea"
                cols="30"
                rows="10"
                placeholder="Type a message..."
            ></textarea>
            <button disabled={!inputValue} onClick={(e) => sendMessage(e)}>
                SEND MESSAGE
            </button>
        </div>
    );
}
