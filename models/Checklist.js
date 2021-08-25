const mongoose = require("mongoose");

const checklistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'item'
  }],
});

module.exports = Checklist = mongoose.model("checklist", checklistSchema);
