const express = require("express");
const compression = require("compression");
const path = require("path");
const { sendEmail } = require("./ses");
const cryptoRandomString = require("crypto-random-string");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const { hash, compare } = require("./bc");
const db = require("./db");
const s3 = require("./s3");
const { s3Url } = require("./config.json");
const { uploader } = require("./upload");

const { requireLoggedOutUser, requireLoggedInUser } = require("./middleware");

const app = express();
app.use(compression());
app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.use(
    cookieSession({
        secret: `I'm not a hacker.`,
        maxAge: 1000 * 60 * 60 * 24 * 356,
    })
);

app.use(csurf());
app.use(function (req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

app.use(
    express.urlencoded({
        extended: false,
    })
);
app.use(express.json());

//////////////////////
////// WELCOME ///////
//////////////////////

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

//////////////////////
//// REGISTRATION ////
//////////////////////

app.post("/registration", async (req, res) => {
    //console.log("REQ BODY INPUT:", req.body.password);

    try {
        const hashedPW = await hash(req.body.password);
        const dbFeedback = await db.addUser(
            req.body.first,
            req.body.last,
            req.body.email,
            hashedPW
        );
        //console.log("DB FEEDBACK:", dbFeedback);
        req.session.userId = dbFeedback.rows[0].id;
        console.log("USER ID: ", req.session.userId);
        res.json(dbFeedback.rows[0].id);
    } catch (err) {
        console.log("error in addUser:", err);
        res.json({
            error: err.code,
        });
    }
});

//////////////////////
/////// LOGIN ////////
//////////////////////

app.post("/login", (req, res) => {
    //onsole.log("INPUT, REQ BODY : ", req.body);
    db.getUserDataByMail(req.body.email)
        .then((dbFeedback) => {
            //console.log("DB FEEDBACK: ", dbFeedback.rows[0]);
            return compare(req.body.password, dbFeedback.rows[0].password).then(
                (match) => {
                    //console.log("VALUE FROM COMPARE: ", match);
                    if (match == true) {
                        req.session.userId = dbFeedback.rows[0].id;
                        //console.log("USER ID", req.session.userId);
                        res.json(req.session.userId);
                    } else {
                        res.json({
                            error: "Wrong password",
                        });
                    }
                }
            );
        })
        .catch((err) => {
            console.log("error in getUserDataByMail:", err);
            res.json({
                error: err.code,
            });
        });
});

//////////////////////
/////// USER  ////////
//////////////////////

app.get("/user", async (req, res) => {
    //console.log("REQ BODY", req.body); //GET REQUESTS NEVER HAVE A BODY!
    console.log("COOKIE ID: ", req.session);
    try {
        const {
            rows: [user],
        } = await db.getUserDataById(req.session.userId);
        console.log("DATA in /user:", user); //nested desrtucturing, the first item of rows will be named user
        res.json(user);
    } catch (err) {
        console.log("err in GET /user", err.message);
        console.log(err.code);
        res.json({
            error: err.code,
        });
    }
});

//////////////////////
//// PROFLE_PIC  /////
//////////////////////

app.post(
    "/profile-pic",
    uploader.single("file"),
    s3.upload,
    async (req, res) => {
        console.log("you've made it inside /profile-pic!");
        //console.log("REQ BODY", req.body);
        //console.log("COOKIE ID: ", req.session.userId);
        if (req.file) {
            console.log("THERE IS A FILE!");
            let fullUrl = s3Url + req.file.filename;
            console.log("Full URL", fullUrl);

            try {
                const { rows } = await db.updateImgById(
                    req.session.userId,
                    fullUrl
                );
                console.log("ROWS: ", rows);
                //console.log("DATA:", user); //nested desrtucturing, the first item of rows will be named user
                res.json(rows[0].profile_pic_url);
            } catch (err) {
                console.log("err in GET /user", err.message);
                console.log(err.code);
                res.json({
                    error: err.code,
                });
            }
        }
    }
);

//////////////////////
//// UPDATE BIO  /////
//////////////////////

app.post("/update-bio", async (req, res) => {
    //console.log("you've made it inside /update-bio!");
    //console.log("REQ BODY", req.body);

    try {
        const { rows } = await db.updateBio(
            req.session.userId,
            req.body.biography
        );
        //console.log("ROWS: ", rows);
        //console.log("DATA:", user); //nested desrtucturing, the first item of rows will be named user
        res.json(rows[0].bio);
    } catch (err) {
        console.log("err in POST /update-bio", err.message);
        console.log(err.code);
        res.json({
            error: err.code,
        });
    }
});

//////////////////////
/// OTHER PROFILE  ///
//////////////////////

app.get("/api/user/:id", async (req, res) => {
    let { id } = req.params;
    console.log("LOG REQ PARAMS: ", id);

    try {
        const {
            rows: [user],
        } = await db.getUserDataById(id);
        console.log("DATA:", user); //nested desrtucturing, the first item of rows will be named user
        if (id != req.session.userId) {
            res.json(user);
        } else {
            res.json({ same: true });
        }
    } catch (err) {
        console.log("err in GET /user", err.message);
        console.log(err.code);
        res.json({
            error: err.code,
        });
    }
});

//////////////////////
//// FIND PEOPLE  ////
//////////////////////

app.get("/api/users/:inputVal?", async (req, res) => {
    let { inputVal } = req.params;
    console.log("LOG REQ PARAMS GET /users/:find: ", inputVal);

    try {
        if (!inputVal) {
            const { rows } = await db.getRecentProfiles();
            console.log("DATA RECENT PROFILES:", rows); //nested desrtucturing, the first item of rows will be named user
            res.json(rows);
        } else {
            const { rows } = await db.getFindPeople(inputVal);
            console.log("DATA FIND PEOPLE:", rows); //nested desrtucturing, the first item of rows will be named user
            res.json(rows);
        }
    } catch (err) {
        console.log("err in GET /users/:find", err.message);
        console.log(err.code);
        res.json({
            error: err.code,
        });
    }
});

//////////////////////
////// FRIENDS  //////
//////////////////////

app.get("/get-friends", async (req, res) => {
    let userId = req.session.userId;
    // console.log("LOG REQ SESSION: ", userId);

    try {
        const { rows } = await db.getFriends(userId);
        console.log("DATA in getFriends:", rows);
        res.json(rows);
    } catch (err) {
        console.log("err in GET /friends", err.message);
        console.log(err.code);
        res.json({
            error: err.code,
        });
    }
});

//////////////////////
/// FRIEND STATUS  ///
//////////////////////

app.get("/friendstatus/:otherId", async (req, res) => {
    let { otherId } = req.params;
    let userId = req.session.userId;
    console.log("LOG REQ PARAMS: ", otherId);

    try {
        const { rows } = await db.checkFriendStatus(userId, otherId);
        console.log("DATA in friendstatus:", rows);
        if (!rows.length) {
            res.json("Send Friend Request"); //there is no array, no friendship -> render "make friend request" button
        } else if (rows[0].accepted) {
            res.json("End Friendship");
        } else if (rows[0].sender_id == userId) {
            res.json("Cancel Friend Request");
        } else {
            res.json("Accept Friend Request");
        }
    } catch (err) {
        console.log("err in GET /friendstatus", err.message);
        console.log(err.code);
        res.json({
            error: err.code,
        });
    }
});

app.post("/friendstatus/:otherId", async (req, res) => {
    let { otherId } = req.params;
    let userId = req.session.userId;
    // console.log("LOG REQ PARAMS: ", otherId);
    console.log("REQ BODY POST friendstatus: ", req.body.text);
    let text = req.body.text;

    if (text == "Send Friend Request") {
        const { rows } = await db.addFriendRequest(userId, otherId);
        console.log("ROWS", rows);
        res.json("Cancel Friend Request");
    } else if (text == "Cancel Friend Request") {
        const { rows } = await db.deleteFriendStatus(userId, otherId);
        console.log("ROWS", rows);
        res.json("Send Friend Request");
    } else if (text == "Accept Friend Request") {
        const { rows } = await db.acceptFriendRequest(userId, otherId);
        console.log("ROWS", rows);
        res.json("End Friendship");
    } else if (text == "End Friendship") {
        const { rows } = await db.deleteFriendStatus(userId, otherId);
        console.log("ROWS", rows);
        res.json("Send Friend Request");
    } else {
        console.log("BUTTON TEXT DOES NOT CORRESPOND WITH CONDITIONS");
        res.json({
            error: true,
        });
    }
});

//////////////////////
///// SEND CODE //////
//////////////////////

app.post("/password/reset/start", async (req, res) => {
    //console.log("REQ BODY RESET: ", req.body);

    const userData = await db.getUserDataByMail(req.body.email);
    //console.log("USER DATA:", userData.rows[0].email);
    if (userData.rows[0].email) {
        try {
            const secretCode = cryptoRandomString({
                length: 6,
            });
            //console.log("SECRET CODE:", secretCode);
            // this is the code for generating the secret code (which is just a random string!
            await db.addResetCode(userData.rows[0].email, secretCode);
            await sendEmail(
                "an.ratner@gmail.com",
                secretCode,
                "Your code to reset the password"
            );
            res.json({ success: true });
        } catch (err) {
            console.log("err in POST /password/reset/start", err.message);
            console.log(err.code);
            res.json({
                error: err.code,
            });
        }
    }
});

//////////////////////
//// VERIFY CODE /////
//////////////////////

app.post("/password/reset/verify", async (req, res) => {
    //console.log("REQ BODY VERIFY: ", req.body);

    const resetData = await db.getResetCode(req.body.code);
    //console.log("secCode:", resetData);
    if (resetData.rows[0].code == req.body.code) {
        try {
            const hashedPw = await hash(req.body.password);
            //console.log("hashedPw:", hashedPw);
            await db.updatePwByEmail(resetData.rows[0].email, hashedPw);
            res.json({ success: true });
        } catch (err) {
            console.log("err in POST /password/reset/verify", err.message);
            console.log("ERR CODE", err.code);
            res.json({
                error: err.code,
            });
        }
    }
});

app.get("/logout", requireLoggedInUser, (req, res) => {
    req.session = null;
    res.redirect("/welcome");
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});

/* app.post("/registration", (req, res) => {
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
            //console.log("USER ID: ", req.session.userId);
            res.json(dbFeedback.rows[0].id);
        })
        .catch((err) => {
            console.log("error in addUser:", err);
            res.json({
                error: err.code,
            });
        });
}); */
