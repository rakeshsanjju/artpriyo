const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.isAuth = async (req, res, next) => {
  try {
    const token =
    req.cookies.token ||
    req.body.token ||
    (req.header("Authorization") ? req.header("Authorization").replace("Bearer ", "") : null);
  

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }
    try {
      const decode = jwt.decode(token, process.env.JWT_SECRET);
      // console.log(decode);
      req.registeredUser = decode;
      console.log(req.registeredUser);
      
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "token is invalid",
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Something went wrong while validating the token",
      error:error.message
    });
  }
};

exports.isAdmin = async(req,res,next)=>{
  try {
    if(req.registeredUser.accountType !== "Admin"){
      return res.status(401).json({
        success:false,
        message:"Access only for the admin role only"
      })
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token verification failed",
      error:error.message
    });
  }
}

exports.isUser = async(req,res,next)=>{
  try {
    if(req.registeredUser.accountType !== "User"){
      return res.status(401).json({
        success:false,
        message:"Access only for the user role only"
      })
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token verification failed",
      error:error.message
    });
  }
}

