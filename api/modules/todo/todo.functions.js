const {createTodoQuery, getTodoQuery, getTodoByIdQuery, updateTodoQuery, removeTodoQuery,removeTodoByIdQuery } = require("./todo.sql.queries");
const createTodo = async (req,res)=>{
    try {
        console.log("im here");
        const db = req.app.get("db");
        const user = req.app.get("user");
        console.log(user);
        const p = {user_id: user.userId,...req.body};
        const response = await createTodoQuery(db,p);

        if(response.insertId > 0){
            return res.json({
                success:true,
                message: "Create Todo Successful"
            })
        }else{
            return res.status(500).json({
                success:false,
                message:"Something went wrong"
            })
        }
    } catch (e) {
        return res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}

const getTodos = async (req,res) => {
    try {
        const db = req.app.get("db");
        const user = req.app.get("user");
        const TodoList = await getTodoQuery(db,user.userId);

        if(TodoList instanceof Array){
            return res.json({
                success:true,
                data: TodoList
            })
        }else{
            return res.status(500).json({
                success:false,
                message:"Something went wrong"
            })
        }
    } catch (e) {
        return res.status(500).json({
            success:false,
            message:"Something went wrong"
        })  
    }
}

const getTodoById = async (req,res) =>{
    try {
        const db = req.app.get("db");
        const user = req.app.get("user");

        const Todo_id = req.params['todo_id'];
        const Todo = await getTodoByIdQuery(db,user.userId,Todo_id);

        if(Todo instanceof Array){
            return res.json({
                success:true,
                data: Todo[0]
            })
        }else{
            return res.status(500).json({
                success:false,
                message:"Something went wrong"
            })
        }
    } catch (e) {
        return res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}

const updateTodo = async (req,res) =>{
    try {
        const db = req.app.get("db");
        const user = req.app.get("user");
        const Todo_id = req.params['todo_id'];
        const p = {...req.body};
        const response = await updateTodoQuery(db,p,user.userId,Todo_id);

        if(response.affectedRows > 0 ){
            return res.json({
                success: true,
                message: "Todo Update Successful"
            })
        }else{
            return res.status(500).json({
                success:false,
                error: 'Unauthorized',
                message:"Something went wrong"
            })
        }

    } catch (e) {
        return res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}

const removeTodo = async(req,res) => {
    try {
        const db = req.app.get("db");
        const user = req.app.get("user");
        const response = await removeTodoQuery(db,user.userId);

        if(response.affectedRows > 0){
            return res.json({
                success: true,
                message: "All Todos were removed successfully"
            })
        }else{
            return res.status(500).json({
                success:false,
                message:"Something went wrong"
            })
        }

    } catch (e) {
        return res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}

const removeTodoById = async(req,res) => {
    try {
        const db = req.app.get("db");
        const user = req.app.get("user");
        const Todo_id = req.params['todo_id'];
        const response = await removeTodoByIdQuery(db,user.userId,Todo_id);

        if(response.affectedRows > 0){
            return res.json({
                success: true,
                message: "Todo removed successfully"
            })
        }else{
            return res.status(500).json({
                success:false,
                message:"Something went wrong"
            })
        }

    } catch (e) {
        return res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}
module.exports = { createTodo, getTodos, getTodoById, updateTodo, removeTodo ,removeTodoById}