//THIS WAS AN ATAMPT TO MAKE THE SUBMIT BUTTON INTO A CUSTOM HOOK, BUT IT DID NOT WORK!!!

// import { useState } from "react";
// import axios from "./Axios";

// export default function submitFriendRequest(userId, otherId) {
//     const [buttonText, setButtonText] = useState("Send Friend Request");

//     console.log("INSIDE submitFriendRequest"); //THIS DOES NOT RUN SINCE I ONLY USE THE checkRelation function (besides buttonText) and everything else is here

//     const checkRelation = async (e) => {
//         e.preventDefault(); //prevent button to trigger refresh
//         console.log("submitFriendRequest inside hook about to run axios");

//         let abort = false;
//         // then this stuff runs SECOND
//         (async () => {
//             try {
//                 const { data } = await axios.get(
//                     `/friendstatus/${userId}/${otherId}`
//                 );
//                 console.log("DATA AXIOS FRIENDSTATUS:", data);
//                 if (!abort) {
//                     setButtonText(data);
//                 }
//             } catch (err) {
//                 console.log(err);
//             }
//         })();
//     };
//     return [buttonText, checkRelation, abort];
// }
