const mongoose = require("mongoose");
const Attachment = require("./Attachment");
const Checklist = require("./Checklist");
const Comment = require("./Comment");

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  deadline: {
    type: Date,
  },
  colorCode: {
    type: String,
  },
  tags: {
    type: [String]
  },
  attachments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'attachment'
  }],
  checklists: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'checklist'
  }],
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'comment'
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    require: true,
  },
  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'board',
    require: true,
  }
}, {
  timestamps: true
});

cardSchema.pre('deleteMany',{ document: true, query: true } , async (next) => {
  try {
    const attachments = await Attachment.find({ attachments: {$in: [this.attachments]} }).lean()
   if (attachments.length > 0) {
    await Attachment.deleteMany({_id: { $in: attachments}});
   }

    const checklists = await Checklist.find({ checklists: {$in: [this.checklists]} }).lean()
    if (checklists.length > 0) {
      await Checklist.deleteMany({_id: { $in: checklists}});
    }

    const comments = await Comment.find({ comments: {$in: [this.comments]} }).lean()
    if (comments.length > 0) {
      await Comment.deleteMany({_id: { $in: comments}});
    }
    return next();
   } catch (error) {
     return next(error);
   }
})

module.exports = Card = mongoose.model("card", cardSchema);
