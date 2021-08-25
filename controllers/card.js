const dayjs = require("dayjs")
var utc = require('dayjs/plugin/utc')
const Card = require("../models/Card");
const Attachment = require("../models/Attachment");
const asyncHandler = require("express-async-handler");
const Checklist = require("../models/Checklist");
const Comment = require("../models/Comment")

dayjs.extend(utc);

// @route POST /users
// @desc Search for users
// @access Private
exports.editCard = asyncHandler(async (req, res, next) => {

  const { _id } = req.params;

  const user = req.user;

  const card = await Card.findById(_id);

  if (!card) {
    res.status(404)
  throw new Error("No card found with given id")
  }

  const {
    name,
    description,
    colorCode,
    deadline,
    tags,
    attachments,
    checklists,
    comments,
  } = req.body;

  // Created verification to avoid change data that was not supposed to be changed.
  if (card.name !== name || name !== (null || undefined)) card.name = name;
  if (card.description !== description || description !== (null || undefined)) card.description = description;
  if (card.colorCode !== colorCode || colorCode !== (null || undefined)) card.colorCode = colorCode;
  if (card.deadline !== deadline || deadline !== (null || undefined)) {
    card.deadline = dayjs.utc(deadline).format();
  };
  if (!(tags === null || undefined)) card.tags = tags;

  if (!(attachments === (null || undefined))) {
    // filter attachments without _id, this attachments are new and we need to create them
    const filterNotCreated = attachments.filter(attachment => !attachment._id && attachment);

    // filter attachments with _id, we don't need to create twice.
    const filterCreated = attachments.filter(attachment => attachment._id && attachment);

    // insertMany attachments without _id to persist data.
    const createAttachments = await Attachment.insertMany(filterNotCreated);


    // merge array with created attachments with the new ones.
    const newAttachments = [...filterCreated, ...createAttachments];

    // insert new array value into card.attachments variable.
    card.attachments = newAttachments;

  };

  if (!(checklists === (null || undefined))) {
    // filter cards without _id, this cards are new and we need to create them
    const filterNotCreated = checklists.filter(checklist => !checklist._id && checklist);

    // filter cards with _id, we don't need to create twice.
    const filterCreated = checklists.filter(checklist => checklist._id && checklist);

    // insertMany card without _id to persist data.
    const createChecklists = await Checklist.insertMany(filterNotCreated);

    // merge array with created checklists with the new ones.
    const newChecklists = [...filterCreated, ...createChecklists];

    // insert new array value into card.checklists variable.
    card.checklists = newChecklists;

  };

  if (!(comments === (null || undefined))) {
    // filter comments without _id, this comments are new and we need to create them
    const filterNotCreated = comments.filter(comment => !comment._id && comment);

    // filter comments with _id, we don't need to create twice.
    const filterCreated = comments.filter(comment => comment._id && comment);

    const { username } = await User.findOne({ _id: user.id })

    // insertMany comments without _id to persist data.
    const createComment = await Comment.create({
      comment: filterNotCreated[0].comment,
      username,
    });

    // merge array with created comments with the new ones.
    const newComments = [...filterCreated, createComment];

    // insert new array value into card.comments variable.
    card.comments = newComments;

  };


  await Card.findOneAndUpdate({_id}, card);

  const updatedCard = await Card.findById(_id).populate(['attachments', 'comments']).populate({
    path: 'checklists',
    populate: {
      path: 'items'
    }
  });

  res.status(201).send({ card: updatedCard})

});


exports.listOneCard = asyncHandler(async (req, res, next) => {
  const { _id } = req.params;

  const card = await Card.findById(_id).populate(['attachments', 'comments']).populate({
    path: 'checklists',
    populate: {
      path: 'items'
    }
  });

  if (!card) {
    res.status(404)
    throw new Error("No card found with given id");
  }

  res.status(200).send({ card });
})


exports.deleteCard = asyncHandler(async (req, res, next) => {
  const { _id } = req.params;


    const card = await Card.findOne({ _id }).deleteMany();

    if (!card) {
      res.status(404);
    throw new Error("Card can't be deleted with given id");
    } else {
      res.status(200).json({ success: true })
    }
})


exports.createCard = asyncHandler(async (req, res, next) => {
  const { name, colorCode, boardId } = req.body;

  const card = await Card.create({
    name,
    colorCode,
    user: req.user.id,
    board: boardId,
  });

  res.status(200).json({ card })
})


exports.listCalendarCards = asyncHandler(async (req, res, next) => {
  const { boardId } = req.params;
  const { date } = req.query;

  const startDate = dayjs(date).startOf('month');
  const endDate = dayjs(date).endOf('month');

  const cards = await Card.find({ user: req.user.id, board: boardId, deadline: { $gte: startDate, $lte: endDate } });

  res.status(200).json({ cards })
})

