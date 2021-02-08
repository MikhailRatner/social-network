// src.welcome.js

import Registration from "./registration";

//"dumb" or "presentational" are alternative names for function components, pre-hook times
export default function Welcome() {
    return (
        <div>
            <h1>Welcome</h1>
            <Registration />
        </div>
    );
}
