const express = require("express");
const colors = require("colors");
const { connectDB } = require("./config/db");
const router = require("./routes/user");
const postRouter = require("./routes/posts");
const paymentRoutes = require("./routes/Payments")
const cookieParser = require("cookie-parser");


require("dotenv").config();
connectDB();
const app = express();
app.use(express.json());
app.use(cookieParser());


const PORT = process.env.PORT || 5000;

app.use("/api/v1/user",router);
app.use("/api/v1/posts",postRouter);
app.use("/api/v1/payment", paymentRoutes);

app.listen(PORT,()=>{
    console.log(`Server is connected to PORT ${PORT}`.yellow.bold);
})

app.use("/",(req,res)=>{
 res.send("Api is running...........")
})