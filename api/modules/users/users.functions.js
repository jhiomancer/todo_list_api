require('dotenv').config()
const { registerUserQuery, getUserByUsernameQuery, getUserPasswordByUsernameQuery, getUsersQuery } = require("./users.sql.queries");
const bcrypt = require("bcryptjs");
const { sign }  = require("jsonwebtoken");

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
        const hashedPassword = await bcrypt.hash(password,10);
        const response = await registerUserQuery(db,{user_username:username,user_password:hashedPassword});
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
            message: "Something went wrong"
        })
    }
}

const getUsers = async(req,res) =>{
    try {
        let db = req.app.get("db");
        let response = await getUsersQuery(db);
        if(response.length > 0){
            return res.json({
                success:true,
                data: response
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
            message: "Something went wrong"
        })
    }
}

const loginUser = async (req,res) => {
    try {
        const db = req.app.get("db");
        const {username,password} = req.body;
        const checkUser = await getUserPasswordByUsernameQuery(db,username);
        console.log(checkUser)
        if(checkUser.length == 0){
            return res.status(500).json({
                success:false,
                message:"User doesn't exist"
            })
        }else{
            const isPasswordCorrect = await bcrypt.compare(password,checkUser[0].user_password);
            if(!isPasswordCorrect){
                return res.status(500).json({
                    success:false,
                    message:"Invalid Username or Password"
                })
            }else{
                const jwtToken = sign({username:checkUser[0].user_username,userId:checkUser[0].user_id},process.env.JWT_KEY);
                return res.status(200).json({
                    success:true,
                    message:"User Login Successful",
                    accessToken: jwtToken
                })
            }
        }
    } catch (e) {
        return res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}



module.exports = { registerUser, loginUser, getUsers };
