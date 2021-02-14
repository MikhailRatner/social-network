// src.welcome.js
import { HashRouter, Route } from "react-router-dom";
import Registration from "./Registration";
import Login from "./Login";
import ResetPassword from "./Reset-password";
import Logo from "./Logo";

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
