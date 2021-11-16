require('dotenv').config();
const router = require("express").Router();

const { createTodo, getTodos, getTodoById, updateTodo, removeTodoById, removeTodo } = require("./todo.functions");
const { authorization } = require("../../conf/middlewares/authorization");

router.route("/create").post(authorization,createTodo);
router.route("/").get(authorization,getTodos);
router.route("/:todo_id").get(authorization,getTodoById);
router.route("/update/:todo_id").post(authorization,updateTodo);
router.route("/remove/:todo_id").delete(authorization,removeTodoById);
router.route("/remove").delete(authorization,removeTodo);

module.exports = router;