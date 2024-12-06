const EventTypes = require("../model/EventTypes");

exports.createEventType = async (req, res) => {
    try {
        const userId = req.registeredUser.id;
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User id required"
            })
        }
        const reqBody = req.body;
        const { eventName, eventImage } = reqBody;
        if (!eventName || !eventImage) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields"
            })
        }
        const newEventType = new EventTypes({
            eventName: eventName,
            eventImage: eventImage
        })
        const saveEventType = await newEventType.save();
        return res.status(201).json({
            success: true,
            message: "EventType is created",
            eventType: saveEventType
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        })
    }
}

exports.fetchAllEventTypes = async (req, res) => {
    try {
        const userId = req.registeredUser.id;
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User id required"
            })
        }
        const eventTypes = await EventTypes.find();
        return res.status(200).json({
            success: true,
            totalEventTypes:eventTypes.length,
            eventTypes: eventTypes
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        })
    }
}

exports.updateEventType = async (req, res) => {
    try {
        const userId = req.registeredUser.id;
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User id required"
            })
        }
        const reqBody = req.body;
        const { eventId, eventName, eventImage } = reqBody;
        if (!eventId) {
            return res.status(400).json({
                success: false,
                message: "Event Id required to update the event type"
            })
        }
        const event = await EventTypes.findById(eventId);
        if (!event) {
            return res.status(400).json({
                success: false,
                message: "Event Type is not found"
            })
        }
        const updateEventType = await EventTypes.findByIdAndUpdate(eventId, { eventName: eventName, eventImage: eventImage }, { new: true });
        return res.status(200).json({
            success: true,
            message: "EventType updated successfully",
            updatedEventType: updateEventType
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        })
    }
}

exports.deleteEventType = async (req, res) => {
    try {
        const userId = req.registeredUser.id;
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User Id required"
            })
        }
        const reqBody = req.body;
        const { eventId } = reqBody;
        if (!eventId) {
            return res.status(400).json({
                success: false,
                message: "Event Id required to delete the event type"
            })
        }
        const event = await EventTypes.findByIdAndDelete(eventId);
        if (!event) {
            return res.status(400).json({
                success: false,
                message: "Event Type is not found"
            })
        }
        return res.status(200).json({
            success: false,
            message: "Event Type deleted successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        })
    }
}

exports.filterAllEventTypes = async(req,res)=>{
    try {
        const userId = req.registeredUser.id;
        if(!userId){
            return res.status(400).json({
                success: false,
                message: "User Id required"
            })
        }
        const eventTypes = await EventTypes.find({})
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        })
    }
}