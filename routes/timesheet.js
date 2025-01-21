const express = require('express');
const router = express.Router();
const { addTime } = require('../controllers/TimeSheetController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/add', authMiddleware, addTime);

module.exports = router;