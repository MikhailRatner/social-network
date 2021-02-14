import ReactDOM from "react-dom";
//import HelloWorld from "./helloWorld";
import Welcome from "./Welcome";
import App from "./App";

let elem;
if (location.pathname === "/welcome") {
    elem = <Welcome />;
} else {
    elem = <App />;
}

ReactDOM.render(elem, document.querySelector("main"));
