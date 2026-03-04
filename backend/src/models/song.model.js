const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  postUrl: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  mood: {
    type: [{
      type: String,
      enum: ["sad", "happy", "surprised"],
    }],
  },
});

const songModel = mongoose.model("songs", songSchema);

module.exports = songModel;
