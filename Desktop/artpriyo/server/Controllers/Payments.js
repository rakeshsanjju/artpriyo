const { instance } = require("../config/razorpay");
const Events = require("../model/Events");
const User = require("../model/User");
const mailSender = require("../utils/mailSender");
const { default: mongoose } = require("mongoose");

//capture the payment and initiate the Razorpay order
exports.capturePayment = async (req, res) => {
  const { eventId } = req.body;
  const userId = req.registeredUser.id;

  if (!eventId) {
    return res.status(400).json({
      success: false,
      message: "Please provide event id",
    });
  }
  let event;
  
  try {
    event = await Events.findById(eventId);
    console.log("Event :--->",event);
    if (!event) {
      return res.status(400).json({
        success: false,
        message: "Could not find the Event",
      });
    }
    const uid = new mongoose.Types.ObjectId(userId);
    if (event.participants.includes(uid)) {
      return res.status(200).json({
        success: false,
        message: "User is already joined the event",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }

  // order create
  const amount = event.entryFee;
  const currency = "INR";
  const options = {
    amount: amount * 100,
    currency,
    receipt: Math.random(Date.now()).toString(),
    notes: {
      eventId: eventId,
      userId,
    },
  };
  console.log("Options :--->",options);
  
  //initite payment using razorpay
  try {
    const paymentResponse = await instance.orders.create(options);
    console.log(paymentResponse);
    return res.status(200).json({
      success: true,
      eventImage: event.image,
      eventId: paymentResponse.id,
      currency: paymentResponse.currency,
      amount: paymentResponse.amount,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Could not initiate order",
      error:error.message
    });
  }
};

//verify Signature of Razorpay and Server

exports.verifySignature = async (req, res) => {
  const webhookSecret = "12345678";

  const signature = req.headers["x-razorpay-signature"];

  const shasum = crypto.createHmac("sha256", webhookSecret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  if (signature === digest) {
    console.log("Payment is Authorised");

    const { eventId, userId } = req.body.payload.payment.entity.notes;

    try {
      //fulfil the action

      //find the course and enroll the student in it
      const joinedEvent = await Events.findOneAndUpdate(
        { _id: eventId },
        { $push: { participants: userId } },
        { new: true }
      );

      if (!joinedEvent) {
        return res.status(500).json({
          success: false,
          message: "Event not Found",
        });
      }

      console.log(joinedEvent);

      const updateUser = await User.findByIdAndUpdate(
        userId,
        { $push: { events: eventId } },
        { new: true }
      );

      //mail send krdo confirmation wala
    //   const emailResponse = await mailSender(
    //     updateUser.email,
    //     "Congratulations from ArtPriyo",
    //     "Congratulations, you can participate in the event"
    //   );

    //   console.log(emailResponse);
      return res.status(200).json({
        success: true,
        message: "Signature Verified and Event Joined",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Invalid request",
    });
  }
};
