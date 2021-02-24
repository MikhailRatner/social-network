import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import { reducer } from "./reducer";
import { initSocket } from "./socket.js";

import Welcome from "./Welcome";
import App from "./App";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

/* socket.on("hello", (data) => {
    console.log("data: ", data);
});

socket.emit("another cool message", [
    "andrea",
    "david",
    "oli",
    "merle",
    "pete",
    "alistair",
    "ivana",
]);
 */

let elem;
if (location.pathname === "/welcome") {
    elem = <Welcome />;
} else {
    elem =
        (initSocket(store),
        (
            <Provider store={store}>
                <App />
            </Provider>
        ));
}

ReactDOM.render(elem, document.querySelector("main"));
