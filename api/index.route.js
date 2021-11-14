const router = require("express").Router();
const userRouter = require("./modules/users/users.route");

router.use("/user",userRouter);
module.exports = router;