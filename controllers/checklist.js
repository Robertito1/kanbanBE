const asyncHandler = require("express-async-handler");
const Item = require('../models/Item');
const Checklist = require('../models/Checklist');

// @route POST /users
// @desc Search for users
// @access Private
exports.updateChecklist = asyncHandler(async (req, res, next) => {
  const { _id } = req.params;

  const { items } = req.body;

  const checklist = await Checklist.findById(_id);

  if (!checklist) {
    res.status(404)
    throw new Error("checklist not found with given id.")
  }


  // filter items without _id, this items are new and we need to create them
  const filterNotCreated = items.filter(item => !item._id && item);

  // filter item with _id, we don't need to create twice.
  const updateItem = await Promise.all(items.filter(item => item._id && item).map(async t => {
    const { _id } = t;
    const item = await Item.findOneAndUpdate({_id}, t);
    return item
  }));

  // insertMany item without _id to persist data.
  const createItems = await Item.insertMany(filterNotCreated);

  // merge array with created items with the new ones.
  const newItems = [...updateItem, ...createItems];

  // insert new array value into card.checklists variable.
  checklist.items = newItems;

  await Checklist.findByIdAndUpdate(_id, {
    items: newItems,
  });


  res.status(201).json({ success: true });
});


exports.deleteChecklist = asyncHandler(async (req, res, next) => {
  const { _id } = req.params;

  const checklist = await Checklist.findById(_id);

  if (!checklist) {
    res.status(404)
    throw new Error("checklist not found with given id.")
  }


  if (checklist.items.length > 0) {
  await Promise.all(checklist.items.map(async item => await Item.deleteOne({_id: item._id})))
  }

  await Checklist.deleteOne({ _id });

  res.status(200).json({ success: true });
});

exports.deleteItem = asyncHandler(async (req, res, next) => {
  const { _id } = req.params;

  const item = await Item.findById(_id);

  if (!item) {
    res.status(404)
    throw new Error("item not found with given id.")
  }

  await Item.deleteOne({ _id });

  res.status(200).json({ success: true });
});


exports.updateItem = asyncHandler(async (req, res, next) => {
  const { _id } = req.params;

  const item = await Item.findById(_id);

  if (!item) {
    res.status(404)
    throw new Error("item not found with given id.")
  }

  const { name, done } = req.body;

  if (item.name !== name || item.name !== (null | undefined)) item.name = name;
  if (item.done !== done || item.done !== (null | undefined)) item.done = done;

  await Item.findByIdAndUpdate(_id, item);


  res.status(201).json({ success: true });
});
