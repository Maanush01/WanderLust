const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const passport = require('passport');
const { saveRedirectUrl } = require('../middleware.js');

const UserController = require("../controllers/users.js");

router.route("/signup").get(UserController.signUp).post(wrapAsync(UserController.signupRender));

// router.get("/signup", UserController.signUp);

// router.post("/signup", wrapAsync(UserController.signupRender));

router.route("/login").get(UserController.login).post(saveRedirectUrl, passport.authenticate("local", { failureRedirect : "/login", failureFlash : true}), UserController.loginRender);

// router.get("/login", UserController.login);

// router.post("/login",saveRedirectUrl, passport.authenticate("local", { failureRedirect : "/login", failureFlash : true}), UserController.loginRender);

router.get("/logout", UserController.logout);

module.exports = router;