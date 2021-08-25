const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const {
  listOneBoard,
  listAllBoards,
  createBoard,
  handleBoard,
} = require('../controllers/board');
const { validateHandleBoard } = require('../validations/board');

router.route('/list/:id').get(protect, listOneBoard);
router.route('/list').get(protect, listAllBoards);
router.route('/create').post(protect, createBoard);
router.route('/handle/:boardId').put(protect, validateHandleBoard, handleBoard);

module.exports = router;
