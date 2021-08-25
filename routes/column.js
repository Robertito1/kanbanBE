const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const {
  deleteColumn,
  editColumn,
} = require('../controllers/column');

router.route('/:_id').delete(protect, deleteColumn);
router.route('/edit/:_id').patch(protect, editColumn)

module.exports = router;
