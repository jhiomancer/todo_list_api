const {registerUserQuery, getUserByUsernameQuery} = require("./users.sql.queries");

const registerUser = async (req,res) => {
    try {
        const db = req.app.get("db");
        const {username,password} = req.body;
        
        const getUserName = await getUserByUsernameQuery(db,username)
        const checkIfUsernameExists = Object.values(JSON.parse(JSON.stringify(getUserName)));

        for (let i = 0; i < checkIfUsernameExists.length; i++) { 
          if (checkIfUsernameExists[i].user_username === username) {
              return res.status(500).json({
                success: false,
                message: "Username already Exists, Please choose a new Username"
            })
          }
          break;
        }
        const response = await registerUserQuery(db,{user_username:username,user_password:password});
        if(response.insertId){
            return res.status(200).json({
                success: true,
                message: "User Registration Successful"
            })
        }else{
            return res.status(500).json({
                success: false,
                message: "Something went wrong"
            })
        }
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "Somethings went wrong"
        })
    }
}

module.exports = registerUser;
