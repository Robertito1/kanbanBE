const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const { editCard, deleteCard, listOneCard, createCard, listCalendarCards } = require('../controllers/card');
const { validateCardEdit } = require('../validations/card');
const checklistRouter = require('./checklist');

router.route('/create').post(protect, createCard);
router.route('/edit/:_id').patch(protect, validateCardEdit, editCard);
router.route('/:_id').delete(protect, deleteCard);
router.route('/list/:_id').get(protect, listOneCard);
router.route('/calendar/:boardId').get(protect, listCalendarCards);
router.use('/checklist', checklistRouter);


module.exports = router;
