const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
  postsId: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  day: {
    type: String,
  }
});

module.exports = mongoose.model("Posts", postsSchema);