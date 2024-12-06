const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const Events = require("../model/Events");
const OTP = require("../model/OTP");
const mongoose = require("mongoose");

require("dotenv").config();

exports.signUp = async (req, res) => {
  try {
    const reqBody = req.body;
    const { firstName, lastName, userName, accountType, email, password } =
      reqBody;
    if (
      !firstName ||
      !lastName ||
      !userName ||
      !email ||
      !accountType ||
      !password
    ) {
      return res.status(400).send({
        success: false,
        message: "Please fill all the fields",
      });
    }
    // validate the email
    const existedEmail = await User.findOne({ email });
    if (existedEmail) {
      return res.status(401).json({
        success: false,
        message: "Email is already registred",
      });
    }
    const checkUserName = await User.findOne({ userName });
    if (checkUserName) {
      return res.status(401).json({
        success: false,
        message: "Username is already in use",
      });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({
      firstName,
      lastName,
      userName,
      email,
      accountType,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    return res.status(200).json({
      success: true,
      message: "User Registered Succesfully. Login with credentials",
      user: savedUser,
    });
  } catch (error) {
    console.log("Error", error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.logIn = async (req, res) => {
  try {
    const reqBody = req.body;
    const { email, password } = reqBody;

    const registeredUser = await User.findOne({ email }).populate("events");

    if (!registeredUser) {
      return res.status(401).json({
        success: false,
        message: "User is not registered",
      });
    }
    const isBlocked = await User.findOne({ isBlocked: true });
    if (isBlocked) {
      return res.status(401).json({
        success: false,
        message: "User is temporarily blocked",
      });
    }
    const matchPassword = await bcrypt.compare(
      password,
      registeredUser.password
    );
    if (matchPassword) {
      const payload = {
        id: registeredUser._id,
        email: registeredUser.email,
        firstName: registeredUser.firstName,
        lastName: registeredUser.lastName,
        userName: registeredUser.userName,
        accountType: registeredUser.accountType,
      };
      const token = await jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "3d",
      });
      (registeredUser.token = token), (registeredUser.password = undefined);

      // cookie
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      registeredUser.populate
      res.cookie("token", token, options).status(200).json({
        success: true,
        message: "Login Successful",
        user: registeredUser,
        token:token
      });
    } else {
      return res.status(401).send({
        success: false,
        message: "Password is incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Login Failed.Please try again",
    });
  }
};

//Fetch all Users
exports.fetchUserDetails = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json({
      success: true,
      totalUsers: users.length,
      users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

exports.fetchRandomUserDetails = async (req, res) => {
  try {
    const user = new mongoose.Types.ObjectId(req.registeredUser.id); // Ensure ObjectId format
    const randomUserCount = 5;

    // Find all users and then randomly sample a subset
    const randomUsers = await User.aggregate([
      {
        $match: {
          _id: { $ne: user },
          connections: { $size: 0 },
          accountType: "User",
        },
      },
      { $sample: { size: randomUserCount } },
    ]);

    return res.status(200).json({
      success: true,
      totalUsers: randomUsers.length,
      users: randomUsers,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

exports.fetchSingleUserDetails = async (req, res) => {
  try {
    const userId = req.registeredUser.id;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User Id required",
      });
    }
    const singleUser = await User.findById(userId);
    if (!singleUser) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    singleUser.password = undefined;
    return res.status(200).json({
      success: true,
      message: "User Details",
      user: singleUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.registeredUser.id;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User Id required",
      });
    }
    const reqBody = req.body;
    const { firstName, lastName, userName, description } = reqBody;
    const updateUser = await User.findByIdAndUpdate(
      userId,
      {
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        description: description,
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "User Details updated",
      updateUser: updateUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.registeredUser.id;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User Id required",
      });
    }

    const reqBody = req.body;
    const { deleteId } = reqBody;

    // Find the user to delete
    const findUser = await User.findById(deleteId);
    if (!findUser) {
      return res.status(400).json({
        success: false,
        message: "User not found or already deleted",
      });
    }

    // Delete all posts associated with the user
    await Posts.deleteMany({ userId: deleteId });

    // Now, delete the user
    const deleteUser = await User.findByIdAndDelete(deleteId);
    if (!deleteUser) {
      return res.status(400).json({
        success: false,
        message: "Error deleting the user",
      });
    }

    // Return a success response
    return res.status(200).json({
      success: true,
      message: "User and associated posts deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

exports.blockUser = async (req, res) => {
  try {
    const userId = req.registeredUser.id;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User Id required",
      });
    }
    const reqBody = req.body;
    const { blockId } = reqBody;
    if (!blockId) {
      return res.status(400).json({
        success: false,
        message: "User Id required to block",
      });
    }
    const blockedUser = await User.findByIdAndUpdate(blockId, {
      isBlocked: true,
    });
    return res.status(200).json({
      success: true,
      message: "User is blocked successfully",
      blockedUser: blockedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

exports.unBlockUser = async (req, res) => {
  try {
    const userId = req.registeredUser.id;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User Id required",
      });
    }
    const reqBody = req.body;
    const { unBlockId } = reqBody;
    if (!unBlockId) {
      return res.status(400).json({
        success: false,
        message: "User Id required to block",
      });
    }
    const unBlockedUser = await User.findByIdAndUpdate(unBlockId, {
      isBlocked: false,
    });
    return res.status(200).json({
      success: true,
      message: "User is unblocked successfully",
      unBlockedUser: unBlockedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

exports.searchUsers = async (req, res) => {
  try {
    const { searchTerm } = req.body;

    if (!searchTerm) {
      return res.status(400).json({
        success: false,
        message: "Search term is required",
      });
    }

    const users = await User.find({
      $or: [
        { firstName: { $regex: searchTerm, $options: "i" } },
        { lastName: { $regex: searchTerm, $options: "i" } },
        { userName: { $regex: searchTerm, $options: "i" } },
      ],
    });
    const currentDate = new Date(); 

    const events = await Events.find({
      $and: [
        { eventName: { $regex: searchTerm, $options: "i" } }, 
        { endDate: { $gt: currentDate } }, 
      ],
    });

    if (!users || !events) {
      return res.status(400).json({
        success: true,
        message: "No users or events found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Users found",
      users: users,
      events: events,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Login Failed.Please try again",
      error: error.message,
    });
  }
};

// connect friend
exports.connectFriend = async (req, res) => {
  try {
    const user = req.registeredUser.id; // Get logged-in user from session
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const { email } = req.body; // Get email from the request body
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    // Check if the email entered is the same as the logged-in user's email
    const loggedInUser = await User.findById(user);
    if (loggedInUser.email === email) {
      return res.status(400).json({
        success: false,
        message: "You cannot send a connection request to yourself",
      });
    }

    // Find the user to connect with based on the email provided
    const connectId = await User.findOne({ email });
    if (!connectId) {
      return res.status(400).json({
        success: false,
        message: "User with that email does not exist",
      });
    }

    // Fetch the logged-in user document and check their current connection state
    const userDoc = await User.findById(user).select("connections pendingConnections");

    // Check if the logged-in user has already sent a connection request
    if (userDoc.pendingConnections.includes(connectId._id)) {
      return res.status(400).json({
        success: false,
        message: "Connection request already sent",
      });
    }

    // Check if the logged-in user is already connected to the recipient
    if (userDoc.connections.includes(connectId._id)) {
      return res.status(400).json({
        success: false,
        message: "User is already in connections",
      });
    }

    // Create a timestamp for the connection request
    const connectionTimestamp = new Date(Date.now());

    // Update the recipient (connectedUser) with the new connection request
    const connectedUser = await User.findByIdAndUpdate(
      connectId._id,
      {
        $push: {
          requestConnections: { user: user, requestedAt: connectionTimestamp }, // Add timestamp for connection request
        },
      },
      { new: true }
    );

    // Update the logged-in user with the new pending connection request
    const loggedInUserUpdate = await User.findByIdAndUpdate(
      user,
      {
        $push: {
          pendingConnections: {
            user: connectId._id,
            pendingAt: connectionTimestamp, // Add timestamp for pending connection
          },
        },
      },
      { new: true }
    );

    // Return a success response
    return res.status(200).json({
      success: true,
      message: "Connection request sent successfully",
      connectedUser: connectedUser, // Return the updated connected user
      connectionTimestamp: connectionTimestamp, // Optionally include the timestamp in response
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to send connection request. Please try again.",
      error: error.message,
    });
  }
};

exports.acceptConnection = async (req, res) => {
  try {
    const userId = req.registeredUser.id; // The logged-in user's ID
    const { acceptUserId } = req.body; // The user we want to accept the connection from

    if (!acceptUserId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    // Convert the acceptUserId and userId to ObjectId if they are not already
    const acceptUserObjectId = new mongoose.Types.ObjectId(acceptUserId);
    const userObjectId = new mongoose.Types.ObjectId(userId);

    // Find the logged-in user and select the connections and requestConnections fields
    const userDoc = await User.findById(userObjectId).select("connections requestConnections");

    if (!userDoc) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if the acceptUserId exists in the requestConnections array
    const connectionRequest = userDoc.requestConnections.find(
      (request) => request.user.toString() === acceptUserId
    );

    if (!connectionRequest) {
      return res.status(400).json({
        success: false,
        message: "No pending connection request from this user",
      });
    }

    // Proceed with the connection acceptance

    // Update the logged-in user's connections and remove the user from the requestConnections
    const loggedInUser = await User.findByIdAndUpdate(
      userObjectId,
      {
        $push: { connections: acceptUserObjectId },
        $pull: { requestConnections: { user: acceptUserObjectId } },
      },
      { new: true }
    );

    // Update the connected user's connections and remove the user from the pendingConnections
    const connectedUser = await User.findByIdAndUpdate(
      acceptUserObjectId,
      {
        $push: { connections: userObjectId },
        $pull: { requestConnections: { user: userObjectId } },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Connection accepted successfully",
      loggedInUser,
      connectedUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to accept connection. Please try again.",
      error: error.message,
    });
  }
};

exports.fetchConnections = async (req, res) => {
  try {
    const user = req.registeredUser.id;
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // Populate the 'user' field inside the 'requestConnections' array
    const connections = await User.findById(user, { requestConnections: true })
      .populate({
        path: "requestConnections.user", // Specify the path to the 'user' field in the 'requestConnections' array
        select: "firstName lastName userName ", // Optional: specify the fields you want to return (e.g., name, email)
      }).populate({
        path: "pendingConnections.user", // Specify the path to the 'user' field in the 'requestConnections' array
        select: "firstName lastName userName email",
      })
      .exec();

    return res.status(200).json({
      success: true,
      message: "Connections Fetched successfully",
      requestConnections: connections.requestConnections,
      pendingConnections:connections.pendingConnections
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch connection request. Please try again.",
      error: error.message,
    });
  }
};

exports.deleteRequestConnection = async (req, res) => {
  try{
    const user = req.registeredUser.id;
    if(!user){
      return res.status(400).json({
        success:false,
        message:"User id required"
      })
    }
    const {deleteRequestId} = req.body;
    if (!deleteRequestId) {
      return res.status(400).json({
        success: false,
        message: "Delete Request ID is required",
      });
    }
    const findRequest = await User.findById(user,{
      requestConnections:1
    })
    if (!findRequest) {
      return res.status(400).json({
        success: false,
        message: "User not found in requests",
      });
    }
    const updatedUser = await User.findByIdAndUpdate(
      user,
      {
        $pull: {
          requestConnections: { user: deleteRequestId }, // Remove the connection
        },
      },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(400).json({
        success: false,
        message: "Error updating the user's requestConnections",
      });
    }
    const updateRequestedUser = await User.findByIdAndUpdate(
      deleteRequestId,
      {
        $pull: {
          pendingConnections: { user: user }
        }
      },
      { new: true }
    );
    
    if (!updateRequestedUser) {
      return res.status(400).json({
        success: false,
        message: "Error updating the deleteRequestId's pendingConnections",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Connection removed successfully...",
    });
  } catch (error) {
    console.log("Error:-------->",error)
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};


// Send OTP For Email Verification
exports.sendotp = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user is already present
    // Find user with provided email
    const checkUserPresent = await User.findOne({ email });
    // to be used in case of signup

    // If user found with provided email
    if (checkUserPresent) {
      // Return 401 Unauthorized status code with error message
      return res.status(401).json({
        success: false,
        message: `User is Already Registered`,
      });
    }

    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    const result = await OTP.findOne({ otp: otp });
    console.log("Result is Generate OTP Func");
    console.log("OTP", otp);
    console.log("Result", result);
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      });
    }
    const otpPayload = { email, otp };
    const otpBody = await OTP.create(otpPayload);
    console.log("OTP Body", otpBody);
    res.status(200).json({
      success: true,
      message: `OTP Sent Successfully`,
      otp,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};

exports.verifyotp = async (req, res) => {
  try {
    const { email, otp } = req.body; // Email and OTP from the user input

    // Check if OTP exists in the database
    const otpRecord = await OTP.findOne({ email, otp });

    if (!otpRecord) {
      // If OTP doesn't exist or is incorrect, return an error
      return res.status(401).json({
        success: false,
        message: "Invalid OTP or OTP expired",
      });
    }

    const otpTimestamp = otpRecord.createdAt;
    const otpExpiry = 10 * 60 * 1000; // OTP expires after 10 minutes
    const currentTimestamp = Date.now();

    if (currentTimestamp - otpTimestamp > otpExpiry) {
      await OTP.deleteOne({ email, otp });
      return res.status(401).json({
        success: false,
        message: "OTP has expired, please request a new one",
      });
    }

    res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};


// Controller for Changing Password
exports.changePassword = async (req, res) => {
  try {
    // Get user data from req.user
    const user = req.registeredUser.id;
    const userDetails = await User.findById(user);

    const { oldPassword, newPassword, confirmNewPassword } = req.body;

    if (oldPassword === newPassword || oldPassword === confirmNewPassword) {
      return res.status(400).json({
        success: false,
        message: "The old password and new password are same",
      });
    }

    // Validate old password
    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      userDetails.password
    );
    if (!isPasswordMatch) {
      // If old password does not match, return a 401 (Unauthorized) error
      return res
        .status(401)
        .json({ success: false, message: "The password is incorrect" });
    }



    // Match new password and confirm new password
    if (newPassword !== confirmNewPassword) {
      // If new password and confirm new password do not match, return a 400 (Bad Request) error
      return res.status(400).json({
        success: false,
        message: "The password and confirm password does not match",
      });
    }

    // Update password
    const encryptedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUserDetails = await User.findByIdAndUpdate(
     user,
      { password: encryptedPassword },
      { new: true }
    );

    // Return success response
    return res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
    console.error("Error occurred while updating password:", error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating password",
      error: error.message,
    });
  }
};
