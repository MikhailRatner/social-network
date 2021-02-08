const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");

app.use(compression());

app.use(express.static(path.join(__dirname, "..", "client", "public")));

const cookieSession = require("cookie-session");
app.use(
    cookieSession({
        secret: `I'm not a hacker.`,
        maxAge: 1000 * 60 * 60 * 24 * 356,
    })
);

app.use(
    express.urlencoded({
        extended: false,
    })
);
app.use(express.json());

const { hash } = require("./bc"); //also destructure compare for login! not now though

const db = require("./db");

app.get("/welcome", (req, res) => {
    // if you don't have the cookie-session middelware this code will NOT work!
    if (req.session.userId) {
        // if the user is logged in... redirect away from /welcome
        res.redirect("/");
    } else {
        // user is not logged in... don't redirect!
        // what happens after sendfile, after we send our HTML back as a response,
        // is start.js
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

app.post("/registration", (req, res) => {
    //console.log("REQ BODY INPUT:", req.body.password);
    hash(req.body.password)
        .then((hashedPW) => {
            return db.addUser(
                req.body.first,
                req.body.last,
                req.body.email,
                hashedPW
            );
        })
        .then((dbFeedback) => {
            //console.log("DB FEEDBACK:", dbFeedback);
            req.session.userID = dbFeedback.rows[0].id;
            //console.log("USER ID: ", req.session.userID);
            res.json(dbFeedback.rows[0]);
        })
        .catch((err) => {
            console.log("error in addUser:", err);
            res.json({
                error: err.code,
            });
        });
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
