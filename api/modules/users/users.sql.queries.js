const SQL_QUERIES = {
    CREATE_USER: "insert into users (user_username, user_password) values (?,?)",
    GET_USER_BY_USERNAME: "select user_username from users where user_username = ?",
    GET_USER_PASSWORD : "select * from users where user_username = ?",
    GET_ALL_USERS : "select user_id as id,user_username as username,user_create_dt as create_dt from users"
}

const registerUserQuery = (db,user) => {
    const p = Object.keys(user).map(key => user[key]);
    return db.query(SQL_QUERIES.CREATE_USER,p);
}

const getUserByUsernameQuery = (db,username) =>{
    return db.query(SQL_QUERIES.GET_USER_BY_USERNAME,[username]);
}

const getUserPasswordByUsernameQuery = (db,username) =>{
    return db.query(SQL_QUERIES.GET_USER_PASSWORD,[username]);
}

const getUsersQuery = (db) => {
    return db.query(SQL_QUERIES.GET_ALL_USERS);
}

module.exports = {registerUserQuery,getUserByUsernameQuery, getUserPasswordByUsernameQuery, getUsersQuery};