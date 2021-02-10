// src.welcome.js
import { HashRouter, Route } from "react-router-dom";
import Registration from "./registration";
import Login from "./login";
import ResetPassword from "./reset-password";

//"dumb" or "presentational" are alternative names for function components, pre-hook times
export default function Welcome() {
    return (
        <div id="welcome">
            <h1>Welcome!</h1>
            <img src="./client/icon.svg" />
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                    <Route path="/reset-password" component={ResetPassword} />
                </div>
            </HashRouter>
        </div>
    );
}
