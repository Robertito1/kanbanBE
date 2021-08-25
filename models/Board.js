const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  lastViewed: {
    type: Boolean,
    default: true
  },
  columns: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'boardColumn'
  }],
}, { discriminatorKey: 'kanban' });

const Board = mongoose.model("board", boardSchema);

const TeamBoard = Board.discriminator('teamBoard',
new mongoose.Schema({ 
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'team'
  },
  description: {
    type: String
  }
}, { discriminatorKey: 'kanbanType' }))

module.exports = {
  Board,
  TeamBoard
}
