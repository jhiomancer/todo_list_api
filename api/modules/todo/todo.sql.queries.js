const SQL_QUERIES = {
    CREATE_TODO: "insert into todos (user_id,todo_name,todo_description) values (?,?,?)",
    GET_TODO: "select * from todos where user_id = ?",
    GET_TODO_BY_ID: "select * from todos where user_id = ? AND todo_id = ?",
    UPDATE_TODO: "update todos set todo_name = ?,todo_description = ? where user_id = ? AND todo_id = ?",
    REMOVE_TODO:"delete from todos where user_id = ?",
    REMOVE_TODO_BY_ID: "delete from todos where user_id = ? AND todo_id = ?"
}

const createTodoQuery = (db,todo) =>{
    const p = Object.keys(todo).map(key => todo[key]);
    return db.query(SQL_QUERIES.CREATE_TODO,p);
}

const getTodoQuery = (db,userId) => {
    return db.query(SQL_QUERIES.GET_TODO,[userId])
}
const getTodoByIdQuery = (db,userId,todoId) => {
    return db.query(SQL_QUERIES.GET_TODO_BY_ID,[userId,todoId])
}

const updateTodoQuery = (db,todo,userId,todo_id) => {
    let p = Object.keys(todo).map(key => todo[key]);
    p.push(userId);
    p.push(todo_id);
    return db.query(SQL_QUERIES.UPDATE_TODO,p);
}

const removeTodoQuery = (db,userId) => {
    return db.query(SQL_QUERIES.REMOVE_TODO,[userId]);
}
const removeTodoByIdQuery = (db,userId,todo_id) => {
    return db.query(SQL_QUERIES.REMOVE_TODO_BY_ID,[userId,todo_id]);
}

module.exports = { createTodoQuery, getTodoQuery, getTodoByIdQuery, updateTodoQuery, removeTodoQuery,removeTodoByIdQuery }