const router = require("express").Router();
const userRouter = require("./modules/users/users.route");
const todoRouter = require("./modules/todo/todo.route");

router.use("/user",userRouter);
router.use("/todo",todoRouter);
module.exports = router;