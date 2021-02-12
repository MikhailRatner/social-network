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

module.exports.updatePwByEmail = (email, newPassword) => {
    const q = `UPDATE users
    SET password = $2
    WHERE email = $1`;
    const params = [email, newPassword];
    return db.query(q, params);
};

module.exports.updateImgById = (id, img) => {
    const q = `UPDATE users
    SET profile_pic_url = $2
    WHERE id = $1
    RETURNING *`;
    const params = [id, img];
    return db.query(q, params);
};

module.exports.getUserDataByMail = (email) => {
    const q = `SELECT id, email, password
    FROM users
    WHERE email = ($1)`;
    const params = [email];
    return db.query(q, params);
};

module.exports.getUserDataById = (id) => {
    const q = `SELECT *
    FROM users
    WHERE id = ($1)`;
    const params = [id];
    return db.query(q, params);
};

module.exports.addResetCode = (email, code) => {
    const q = `INSERT INTO reset_codes (email, code)
    VALUES ($1,$2)`;
    const params = [email, code];
    return db.query(q, params);
};

module.exports.getResetCode = (code) => {
    const q = `SELECT * FROM reset_codes
    WHERE CURRENT_TIMESTAMP - timestamp < INTERVAL '10 minutes'
    AND code = $1`;
    const params = [code];
    return db.query(q, params);
};
