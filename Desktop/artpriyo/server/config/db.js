const mongoose = require("mongoose");
require("dotenv").config();

exports.connectDB = async(req,res)=>{
    try {
        const conn = mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connection success: ${(await conn).connection.host}`.cyan.underline);
    } catch (error) {
        console.log(`Connection errorv${error.message}`);
        process.exit();
    }
}