const mongoose = require("mongoose");
const Card = require("./Card");


const boardColumnSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cards: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'card'
  }],
});

boardColumnSchema.pre('deleteMany',{ document: true, query: true } , async (next) => {
  try {
    const cards = await Card.find({ cards: {$in: [this.cards]} }).lean()
    if (cards.length > 0) {
      await Card.deleteMany({_id: { $in: cards}});
    }

    return next();
   } catch (error) {
     return next(error);
   }
})

module.exports = BoardColumns = mongoose.model("boardColumn", boardColumnSchema);
