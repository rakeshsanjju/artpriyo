// Import the required modules
const express = require("express")
const router = express.Router()

const { capturePayment, verifySignature } = require("../Controllers/Payments")
const { isAuth, isUser } = require("../middlewares/auth")

router.post("/capturePayment", isAuth, isUser, capturePayment)
router.post("/verifySignature", verifySignature)

module.exports = router