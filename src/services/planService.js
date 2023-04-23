const Plan = require("../database/Plan");

module.exports = {
    getAllPlans: async () => {
        try {
            const plans = await Plan.getAllPlans();
            return plans;
        } catch (error) {
            throw error;
        }
    },
    getOnePlan: async (params) => {
        try {
            const plan = await Plan.getOnePlan(params);
            return plan;
        } catch (error) {
            throw error;
        }
    },
    createNewPlan: async (params) => {
        try {
            const createdPlan = Plan.createPlan(params);
            return createdPlan;
        } catch (error) {
            throw error;
        }
    },
    destroyPlan: async (params) => {
        try {
            Plan.destroyPlan(params);
        } catch (error) {
            throw error;
        }
    }
};