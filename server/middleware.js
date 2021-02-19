module.exports.requireLoggedOutUser = (req, res, next) => {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        next();
    }
};

/* login, register, home */

module.exports.requireLoggedInUser = (req, res, next) => {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        next();
    }
};
