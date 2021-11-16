const router = require("express").Router();
const { authorization }  = require("../../conf/middlewares/authorization");
const { registerUser, loginUser, getUsers } = require("./users.functions");

router.route("/").get(getUsers);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

module.exports = router;
