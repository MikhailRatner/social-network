import { useState } from "react";
import axios from "./Axios";

export default function useAuthSubmit(url, values) {
    const [error, setError] = useState(false);
    //error was also 'false' in setState constructor function

    const handleSubmit = async (e) => {
        e.preventDefault(); //prevent button to trigger refresh
        console.log("useAuthSubmit inside hook about to run axios");

        if (!values) {
            setError(true);
        } else {
            try {
                const { data } = await axios.post(url, values);
                console.log("DATA inside Login:", data);
                //alternative version: data.success ? location.replace("/") : setError(true)
                if (!data.error) {
                    location.replace("/");
                } else {
                    setError({
                        error: data.error,
                    });
                }
            } catch (err) {
                console.log("err in Login: ", err);
                this.setState({
                    error:
                        "Either your email is already registered or your password is wrong",
                });
            }
        }
    };
    return [error, handleSubmit];
}
