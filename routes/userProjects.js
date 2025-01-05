const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId).populate({
            path: 'projects',
            populate: { path: 'client timesheets' }, // Populate nested references
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ projects: user.projects });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
