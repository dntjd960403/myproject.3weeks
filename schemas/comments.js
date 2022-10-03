const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
  
  name: {
    type: String,
    required: true
  },
  content: {
    type: String,
  },
  day: {
    type: Date,
    default: Date.now
  },
  password: {
    type: Number,
    required: true
  },
  postId: {
    type: String,
  }
});

module.exports = mongoose.model("Comments", commentsSchema);