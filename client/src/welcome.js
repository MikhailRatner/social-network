// src.welcome.js
import { HashRouter, Route } from "react-router-dom";
import Registration from "./registration";
import Login from "./login";
import ResetPassword from "./reset-password";
import Logo from "./logo";

//function component, pre-hook times,"dumb" or "presentational" are alternative names
export default function Welcome() {
    return (
        <div id="welcome">
            <Logo />
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
