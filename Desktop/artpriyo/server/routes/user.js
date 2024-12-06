const express = require("express");
const { signUp, logIn, fetchUserDetails, searchUsers, connectFriend, acceptConnection, updateUser, unBlockUser, deleteUser, blockUser, fetchSingleUserDetails, sendotp, changePassword, fetchConnections, fetchRandomUserDetails, deleteRequestConnection } = require("../Controllers/Auth");
const { isAuth, isUser, isAdmin } = require("../middlewares/auth");
const { postLike, removeLike } = require("../Controllers/Likes");
const { createEventType, fetchAllEventTypes, deleteEventType, updateEventType } = require("../Controllers/EventType");
const { createEvent, fetchAllEvents, updateEvent, deleteEvent, onGoingEvents } = require("../Controllers/Events");
const { resetPasswordToken, resetPassword } = require("../Controllers/ResetPassword");
const router = express.Router();

router.post("/signup", signUp);
router.post("/login", logIn);
router.get("/fetchAllUsers",isAuth,fetchUserDetails);
router.get("/fetch/random/users",isAuth,isUser,fetchRandomUserDetails)
router.post("/search",searchUsers);

// Route for sending OTP to the user's email
router.post("/sendotp", sendotp)

// Route for Changing the password
router.post("/change/password", isAuth, changePassword)

// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken)

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword)

router.put("/update",isAuth,updateUser);
router.get("/fetch/singleUser",isAuth,fetchSingleUserDetails)
router.put("/block",isAuth,isAdmin,blockUser);
router.put("/unBlockUser",isAuth,isAdmin,unBlockUser);
router.delete("/delete",isAuth,isAdmin,deleteUser);

// connections
router.post("/connectFriend",isAuth,isUser,connectFriend)
router.get("/fetch/connections",isAuth,isUser,fetchConnections)
router.post("/acceptFriend",isAuth,isUser,acceptConnection)
router.post("/delete/request/connection",isAuth,deleteRequestConnection)

// Like the Post
router.post("/likePost",isAuth,isUser,postLike);
router.post("/disLikePost",isAuth,isUser,removeLike);

// event types
router.post("/create/eventType",isAuth,isAdmin,createEventType);
router.get("/fetch/eventTypes",isAuth,fetchAllEventTypes);
router.put("/update/eventType",isAuth,isAdmin,updateEventType);
router.delete("/delete/eventType",isAuth,isAdmin,deleteEventType);

// events
router.post("/create/event",isAuth,isAdmin,createEvent);
router.get("/fetch/events",isAuth,fetchAllEvents);
router.get("/ongoing/events",isAuth,onGoingEvents);
router.put("/update/event",isAuth,isAdmin,updateEvent)
router.delete("/delete/event",isAuth,isAdmin,deleteEvent);



router.get("/test", isAuth, (req, res) => {
    return res.status(200).json({
      success: true,
      message: "Welcome to Test Route",
    });
  });

  router.get("/user/test", isAuth,isUser, (req, res) => {
    return res.status(200).json({
      success: true,
      message: "Welcome to User Route",
    });
  });

module.exports = router;
