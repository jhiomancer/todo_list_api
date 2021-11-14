const router = require("express").Router();
const { registerUser, loginUser, getUsers } = require("./users.functions");

router.route("/").get(getUsers);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

module.exports = router;