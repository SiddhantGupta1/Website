const express = require("express");
require("./db/mongoose");
const userRouter = require("./routes/userRoutes");
const authRouter = require("./routes/authRoutes");
// const { signup } = require("./controllers/authController");
// const User = require("./models/User");


const app = express();

app.use(express.json());
app.use(userRouter);
app.use(authRouter);

app.get("/signup",(req,res)=>{
    res.json({"users": ["userOne","usertwo"]})
})

module.exports = app;
