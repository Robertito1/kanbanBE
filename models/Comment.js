const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
}, {
  timestamps: true
});

module.exports = Comment = mongoose.model("comment", commentSchema);
