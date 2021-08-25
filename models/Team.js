const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: string,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  boards: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'teamBoard'
  }],
  collaborators: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }],
});

module.exports = Team = mongoose.model("team", teamSchema);
