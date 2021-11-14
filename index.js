const express = require("express");
const db = require("./api/conf/db_conn");
const PORT = process.env.PORT || 3000;
const apiRouter = require("./api/index.route");

//Initialization
const app = express();
//Setting database connection object on app

app.set("db",db);

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.send("My firt API project");
});

app.use("/api",apiRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})