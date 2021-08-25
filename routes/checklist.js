const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const { updateChecklist, deleteChecklist, updateItem, deleteItem } = require('../controllers/checklist');

router.route('/:_id').patch(protect, updateChecklist);
router.route('/:_id').delete(protect, deleteChecklist);
router.route('/item/:_id').patch(protect, updateItem);
router.route('/item/:_id').delete(protect, deleteItem);


module.exports = router;
