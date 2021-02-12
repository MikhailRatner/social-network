import ReactDOM from "react-dom";
//import HelloWorld from "./helloWorld";
import Welcome from "./welcome";
import App from "./app";

let elem;
if (location.pathname === "/welcome") {
    elem = <Welcome />;
} else {
    elem = <App />;
}

ReactDOM.render(elem, document.querySelector("main"));
