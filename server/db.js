// this module holds all the queries we'll using to talk to our database

const spicedPg = require("spiced-pg");

const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/socialNetworkDb"
    // spicedPg('whoDoWeWantToTalkTo:whichUserShouldBeRunningOurQueries:whatPasswordDoesThisUserHave@WhereDoesThisCommuncationHappen:specifiedPortForCommunication/NameOfOurDatabase)
);

module.exports.addUser = (firstName, lastName, email, password) => {
    const q = `INSERT INTO users (first, last, email, password)
    VALUES ($1,$2,$3,$4) RETURNING id`;
    const params = [firstName, lastName, email, password];
    return db.query(q, params);
};

module.exports.updateUserNoPw = (firstName, lastName, email, userID) => {
    const q = `UPDATE users
    SET first = $1, last = $2, email = $3
    WHERE id = $4`;
    const params = [firstName, lastName, email, userID];
    return db.query(q, params);
};

module.exports.getUserDataByMail = (email) => {
    const q = `SELECT id, email, password
    FROM users
    WHERE email = ($1)`;
    const params = [email];
    return db.query(q, params);
};

module.exports.addResetCode = (email, code) => {
    const q = `INSERT INTO resetcodes (email, code)
    VALUES ($1,$2)`;
    const params = [email, code];
    return db.query(q, params);
};

module.exports.getResetPassword = (email) => {
    const q = `SELECT password FROM resetpasswords
    WHERE CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes'
    AND email = $1`;
    const params = [email];
    return db.query(q, params);
};
