const mongoose = require("mongoose");

const invitationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  email: {
    type: String,
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'team',
    required: true,
  },
});

module.exports = Invitation = mongoose.model("invitation", invitationSchema);