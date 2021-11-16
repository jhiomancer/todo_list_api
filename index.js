require('dotenv').config()
const express = require("express");
const db = require("./api/conf/db_conn");
const PORT = process.env.PORT;
const apiRouter = require("./api/index.route");
const app = express();

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
