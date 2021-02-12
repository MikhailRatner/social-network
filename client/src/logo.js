export default function Logo() {
    return (
        <>
            <img className="logoImg" src="./icon.svg" width="70px" />
        </>
    );
}

/*

// ================================ WARM UP ================================= \\
// We are importing some unknown values from "./values.js"
let {
    profilePic,
    number,
    loggedIn,
    user,
    error,
    rows,
} = require("./values.js");

// All that is known about the values above is the following:
// - "profilePic" is a string (possibly empty)
// - "number" is a number
// - "loggedIn" is a boolean
// - "user" can be undefined, if it is defined it is an object
// - "error" is a boolean
// - "rows" is a (possibly empty) array of objects containing an "id" property

// ================================== Task ================================== \\
// Accomplish the following without using the if / else / switch keywords:
// 1. Assign "profilePic" a default value of "default.png" if it is empty

profilePic = profilePic || "default.pmg"

// 2. Log the value of "number" only if it is positive

number >0

// 3. Create a variable "statusCode", set it to 200 if "loggedIn" is true and
//    404 otherwise
// 4. Create a variable "name" and assign it the value of "user.name", if it
//    exists.

const name = user && user.name

// 5. If "error" is true call "showError()" else call "showSuccess()"

error ? schowError() : showSuccess()

if(error) {
    showError()
} else {
    showSuccess()
}

// 6. Create a variable "id" and assign to it the id of the first element in

//    "rows" or null if there are none.






*/

/*
// ================================ WARM UP ================================= \\

// We are declaring a "Dog" class which will allow us to create dogs with a name
// and friends. Dogs can then bark saying their name or call their friends. They
// can also do asynchronous stuff like fetching sticks.

class Dog {
    constructor({ name, friends }) {
        this.name = name;
        this.friends = friends;

        // ⚠️ Note that we bind "callFriends()" but not "bark()"
        this.callFriends = this.callFriends.bind(this);
    }

    bark() {
        console.log(`Wouf! I am ${this.name}!`);
    }

    callFriends() {
        console.log(`${this.friends.join(", ")}!`);
    }

    fetch() {
        return Promise.resolve("stick");
    }

    fetchThenBark1() {
        this.fetch().then(this.bark);
    }

    fetchThenBark2() {
        this.fetch().then(() => this.bark());
    }

    fetchThenCallFriends1() {
        this.fetch().then(this.callFriends);
    }

    fetchThenCallFriends2() {
        this.fetch().then(() => this.callFriends());
    }
}

// Our dog of interest is Copper 🐶, his friends are Tod 🦊 and Chief 🦮
const copper = new Dog({
    name: "Copper",
    friends: ["Tod", "Chief"],
});

// ================================== Task ================================== \\
// Determine what happens when Copper barks or calls his friends in the contexts
// below:

// Directly As Standard Method Calls -------------------------------------------
copper.bark();                      // ❓
copper.callFriends();               // ❓

// As various callback versions to .then() after fetching a stick --------------
copper.fetchThenBark1();            // ❓
copper.fetchThenBark2();            // ❓

// Remember: "callFriends()" is bound to "this" in the constructor
copper.fetchThenCallFriends1();     // ❓
copper.fetchThenCallFriends2();     // ❓
*/
