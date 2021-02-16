import axios from "axios";
import { useState, useEffect } from "react";

export default function FindPeople(props) {
    console.log("props in FindPeople: ", props);
    const [otherName, setOtherName] = useState("");
    const [otherProfiles, setOtherProfiles] = useState([]);

    // example #2: with async/await
    useEffect(() => {
        let abort = false;
        // then this stuff runs SECOND
        (async () => {
            try {
                const { data } = await axios.get(`/api/users/${otherName}`);
                console.log("DATA AXIOS:", data);
                if (!abort) {
                    setOtherProfiles(data);
                }
            } catch (err) {
                console.log(err);
            }
        })();

        // cleanup function
        // runs before every re-render
        return () => {
            console.log("otherProfiles in returned functions");

            abort = true;
        };
    }, [otherName]);

    return (
        <div className="findPeople">
            <h2>Find People</h2>
            <input
                onChange={(e) => setOtherName(e.target.value)}
                name="findPeople"
                type="text"
                placeholder="Search people here..."
            />
            {otherProfiles.map((elem, index) => {
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
                    </div>
                );
            })}
        </div>
    );
}

/*
            (async () => {
                try {
                    const { data } = await axios.get(`/api/users`);
                    console.log("DATA IN RETURNED FUNCTION: ", data);
                    setOtherProfiles(data);
                } catch (err) {
                    console.log(err);
                }
            })();
*/

/*

*/
