const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
  
  title: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  contents: {
    type: String,
  },
  day: {
    type: Date,
    default: Date.now
  },
  password: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Posts", postsSchema);