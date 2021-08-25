const Card = require("../models/Card");
const asyncHandler = require("express-async-handler");
const BoardColumn = require("../models/BoardColumn");

exports.deleteColumn = asyncHandler(async (req, res, next) => {
  const { _id } = req.params;

  const boardColumn = await BoardColumn.deleteOne({ _id })

  if (boardColumn.deletedCount === 0) {
    res.status(404);
    throw new Error("Column can't be deleted with given id");
  }

  res.status(204).send()

})


exports.editColumn = asyncHandler(async (req, res, next) => {

  const { _id } = req.params;

  const column = await BoardColumn.findById(_id);

  if (!column) {
    res.status(404)
  throw new Error("No column was found with given id")
  }

  const {
    name,
  } = req.body;

  // Created verification to avoid change data that was not supposed to be changed.
  if (column.name !== name || name !== (null || undefined)) {
    await BoardColumn.findOneAndUpdate({_id}, { name });
  };



  const updatedColumn = await BoardColumn.findById(_id);

  res.status(201).send({ column: updatedColumn})

});
