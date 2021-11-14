const router = require("express").Router();

const registerUser = require("./users.functions");

router.route("/register").post(registerUser);

module.exports = router;