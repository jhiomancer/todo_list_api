const SQL_QUERIES = {
    CREATE_USER: "insert into users (user_username, user_password) values (?,?)",
    GET_USER_BY_USERNAME: "select user_username from users where user_username = ?"
}

const registerUserQuery = (db,user) => {
    const p = Object.keys(user).map(key => user[key]);
    return db.query(SQL_QUERIES.CREATE_USER,p);
}


const getUserByUsernameQuery = (db,username) =>{
    return db.query(SQL_QUERIES.GET_USER_BY_USERNAME,[username]);
}

module.exports = {registerUserQuery,getUserByUsernameQuery};