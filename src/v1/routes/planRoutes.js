const express = require('express');
const planController = require('../../controllers/planController');

const router = express.Router();

router.get('/', planController.getAllPlans);
router.get('/:planId', planController.getOnePlan);
router.post('/', planController.createNewPlan);
router.delete('/:planId', planController.destroyPlan);

module.exports = router;