const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  description: { type: String,required:true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "likes"}],
  shares: [{type: mongoose.Schema.Types.ObjectId, ref: "users"}],
  media: { type: String },
  isBlocked:{type:Boolean,default:false},
},{timestamps:true});

postSchema.path("media").validate(async function (value) {
    if(!this.event){
      return true;
    }
    const event = await mongoose.model("events").findById(this.event);
    if (!event) {
      throw new Error("Event not found");
    }
    const mediaType = event.mediaType;
    let validExtensions;
    switch(mediaType){
      case "Image":
        validExtensions = /\.(png|jpeg|jpg)$/i;
        break
      case "Video":
        validExtensions = /\.mp4$/i;
        break
      case "Audio":
        validExtensions = /\.mp3$/i;
        break
      default:
        return false
    }
    if(!validExtensions.test(value)){
      return false;
    }
    return true;
}, "Invalid media file type");

const Post = mongoose.model("posts", postSchema);
module.exports = Post;
