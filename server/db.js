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

module.exports.getFriends = (userId) => {
    const q = `SELECT users.id, first, last, profile_pic_url, accepted
    FROM friendships
    JOIN users
    ON (accepted = false AND recipient_id = $1 AND sender_id = users.id)
    OR (accepted = true AND recipient_id = $1 AND sender_id = users.id)
    OR (accepted = true AND sender_id = $1 AND recipient_id = users.id)`;
    const params = [userId];
    return db.query(q, params);
};
/* getFriends
    -- this will return users that you're friends with and users who have sent YOU a friend request. 
    -- Users that you've sent a friend request to will NOT show up in this query.
*/

/* module.exports.upsertFriendStatus = (userId, otherId, status) => {
    const q = `INSERT INTO friendships (sender_id, recipient_id, accepted)
    VALUES ($1,$2,$3)
    ON CONFLICT WHERE (recipient_id = $1 AND sender_id = $2)
    OR (recipient_id = $2 AND sender_id = $1)
    DO UPDATE SET sender_id = $1, recipient_id = $2, accepted = $3`;
    const params = [userId, otherId, status];
    return db.query(q, params);
}; */

module.exports.checkFriendStatus = (userId, otherId) => {
    const q = `SELECT * FROM friendships
    WHERE (recipient_id = $1 AND sender_id = $2)
    OR (recipient_id = $2 AND sender_id = $1)`;
    const params = [userId, otherId];
    return db.query(q, params);
};

module.exports.addFriendRequest = (userId, otherId) => {
    const q = `INSERT INTO friendships (sender_id, recipient_id)
    VALUES ($1, $2)`;
    const params = [userId, otherId];
    return db.query(q, params);
};

module.exports.acceptFriendRequest = (userId, otherId) => {
    const q = `UPDATE friendships
    SET accepted = true
    WHERE (recipient_id = $1 AND sender_id = $2)
    OR (recipient_id = $2 AND sender_id = $1)`;
    const params = [userId, otherId];
    return db.query(q, params);
};

module.exports.deleteFriendStatus = (userId, otherId) => {
    const q = `DELETE FROM friendships
    WHERE (recipient_id = $1 AND sender_id = $2)
    OR (recipient_id = $2 AND sender_id = $1)`;
    const params = [userId, otherId];
    return db.query(q, params);
};

module.exports.getMessages = () => {
    const q = `SELECT * FROM messages
    JOIN users
    ON user_id = users.id
    ORDER BY TIMESTAMP DESC
    LIMIT 10`;
    return db.query(q);
};

module.exports.postMessage = (userId, message) => {
    const q = `INSERT INTO messages (user_id, message)
    VALUES ($1, $2)`;
    const params = [userId, message];
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
