const express = require('express');
const router = express.Router();
const {
  getMilestones,
  createMilestone,
  updateMilestone,
  deleteMilestone,
} = require('../controllers/milestoneController');
const { protect } = require('../middleware/auth');

router.get('/', getMilestones);
router.post('/', protect, createMilestone);
router.put('/:id', protect, updateMilestone);
router.delete('/:id', protect, deleteMilestone);

module.exports = router;
