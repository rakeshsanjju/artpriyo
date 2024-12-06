const Events = require("../model/Events");
const EventTypes = require("../model/EventTypes");
const User = require("../model/User");

exports.createEvent = async (req, res) => {
  try {
    const userId = req.registeredUser.id;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User Id required",
      });
    }
    const reqBody = req.body;
    const { eventType, startDate, endDate, entryFee, prizeMoney, mediaType } =
      reqBody;
    const event = await EventTypes.findById(eventType);
    if (!event) {
      return res.status(400).json({
        success: false,
        message: "Event type is not found",
      });
    }
    if (
      !eventType ||
      !startDate ||
      !endDate ||
      !entryFee ||
      !prizeMoney ||
      !mediaType
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }
    const eventImg = event.eventImage;
    const eventNaam = event.eventName;
    const newEvent = new Events({
      eventType: eventType,
      eventName:eventNaam,
      startDate: startDate,
      endDate: endDate,
      entryFee: entryFee,
      prizeMoney: prizeMoney,
      eventImage: eventImg,
      mediaType: mediaType,
    });
    const saveEvent = await newEvent.save();
    const updateUser = await User.findByIdAndUpdate(
      userId,
      { $push: { events: saveEvent._id } },
      { new: true }
    ).populate("events");

    return res.status(201).json({
      success: true,
      message: "Event Created Succesfully",
      event: saveEvent,
      user: updateUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

exports.fetchAllEvents = async (req, res) => {
  try {
    const events = await Events.find({});
    return res.status(200).json({
      success: true,
      totalEvents: events.length,
      events: events,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

exports.onGoingEvents = async (req, res) => {
  try {
    const currentDate = new Date(); // Get the current date and time

    // Fetch all events that have an `endDate` greater than the current date
    const events = await Events.find({
      endDate: { $gte: currentDate }, // Only events that have not yet ended
    });

    const eventsWithStatus = events.map(event => {
      const isCompleted = new Date(event.endDate) < currentDate; // Check if the event is completed
      return { 
        ...event.toObject(), // Convert Mongoose document to a plain object
        isCompleted 
      };
    });

    return res.status(200).json({
      success: true,
      totalEvents: eventsWithStatus.length,
      events: eventsWithStatus,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};


exports.updateEvent = async (req, res) => {
  try {
    const userId = req.registeredUser.id;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User Id required",
      });
    }
    const reqBody = req.body;
    const {
      eventId,
      eventType,
      startDate,
      endDate,
      entryFee,
      prizeMoney,
      mediaType,
    } = reqBody;
    const findEvent = await Events.findById(eventId);
    if (!findEvent) {
      return res.status(400).json({
        success: false,
        message: "Event is not found",
      });
    }
    if (!eventId) {
      return res.status(400).json({
        success: false,
        message: "Event Id is required to update",
      });
    }
    const updateEvent = await Events.findByIdAndUpdate(
      eventId,
      {
        eventType: eventType,
        startDate: startDate,
        endDate: endDate,
        entryFee: entryFee,
        prizeMoney: prizeMoney,
        mediaType: mediaType,
      },
      { new: true }
    );
    return res.status(200).json({
      success: false,
      message: "Event updated successfully",
      updateEvent: updateEvent,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const userId = req.registeredUser.id;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User id is required",
      });
    }
    const reqBody = req.body;
    const { eventId } = reqBody;
    if (!eventId) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }
    const event = await Events.findById(eventId);
    if (!event) {
      return res.status(400).json({
        success: false,
        message: "Event is already deleted",
      });
    }
    await Events.findByIdAndDelete(eventId, { new: true });
    const updateUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { eventId } },
      { new: true }
    ).populate("events");
    return res.status(200).json({
      success: true,
      message: "Event is deleted",
      user: updateUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

exports.joinEvent = async (req, res) => {
  try {
    const userId = req.registeredUser.id;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User id is required",
      });
    }
    const reqBody = req.body;
    const {eventId} = reqBody;
    if(!eventId){
        return res.status(400).json({
            success: false,
            message: "Please provide event id"
        })
    }
    const findEvent = await Events.findById(eventId);
    if(!findEvent){
        return res.status(400).json({
            success: false,
            message: "Event no found"
        })
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};


