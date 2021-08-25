const mongoose = require("mongoose");

const attachmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
});

module.exports = Attachment = mongoose.model("attachment", attachmentSchema);
