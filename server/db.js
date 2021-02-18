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

module.exports.updateBio = (id, bio) => {
    const q = `UPDATE users
    SET bio = $2
    WHERE id = $1
    RETURNING *`;
    const params = [id, bio];
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

module.exports.getRecentProfiles = () => {
    return db.query(`SELECT * FROM users ORDER BY id DESC LIMIT 3`);
};

module.exports.getFindPeople = (inputVal) => {
    return db.query(
        `SELECT * FROM users WHERE first ILIKE $1 OR last ILIKE $1 LIMIT 10;`,
        [inputVal + "%"]
    );
};

module.exports.checkFriendStatus = (userId, otherId) => {
    const q = `SELECT * FROM friendships
    WHERE (recipient_id = $1 AND sender_id = $2)
    OR (recipient_id = $2 AND sender_id = $1)`;
    const params = [userId, otherId];
    return db.query(q, params);
};

module.exports.upsertFriendStatus = (userId, otherId, status) => {
    const q = `INSERT INTO friendships (sender_id, recipient_id, accepted)
    VALUES ($1,$2,$3)
    ON CONFLICT WHERE (recipient_id = $1 AND sender_id = $2)
    OR (recipient_id = $2 AND sender_id = $1)
    DO UPDATE SET sender_id = $1, recipient_id = $2, accepted = $3`;
    const params = [userId, otherId, status];
    return db.query(q, params);
};

module.exports.deleteFriendStatus = (userId, otherId) => {
    const q = `DELETE * FROM friendships
    WHERE (recipient_id = $1 AND sender_id = $2)
    OR (recipient_id = $2 AND sender_id = $1)`;
    const params = [userId, otherId];
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
