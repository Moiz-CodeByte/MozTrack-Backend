const express = require('express');
const router = express.Router();
const { addTime, updateTime, deleteTime, getUserTimesheets } = require('../controllers/TimeSheetController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, addTime);
router.put('/:id', authMiddleware, updateTime);
router.delete('/:id', authMiddleware, deleteTime);
router.get('/getTimesheet', authMiddleware, getUserTimesheets);

module.exports = router;