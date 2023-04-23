const planService = require("../services/planService");

const plan = {
    getAllPlans: async (req, res) => {
        try {
            const plans = await planService.getAllPlans();
            return res.send({status: 'OK', data: plans});
        } catch (error) {
            return res.status(error?.status || 500).send({
                status: "failed", 
                data: {
                    error: error?.message || error
                }
            });
        }
    },
    getOnePlan: async (req, res) => {
        try {
            const { planId } = req.params;
            if (!planId) {
                res.status(500).send({
                    status: "failed",
                    data: {
                        error: "parameter: 'planId' can't be empty"
                    }
                })
            }
            const plan = await planService.getOnePlan({planId});
            return res.send({status: 'OK', data: plan});
        } catch (error) {
            return res.status(error?.status || 500).send({
                status: "failed", 
                data: {
                    error: error?.message || error
                }
            });
        }
    },
    createNewPlan: async (req, res) => {
        try {
            const { body } = req;
            if (!body.name || !body.privacy_id) {
                return res.status(400).send({
                    status: "failed",
                    data: {
                        error: "One of the following keys is missing or is empty in request body: 'name', 'privacy_id'"
                    }
                })
            }
            const newPlan = {
                name: body.name,
                privacy_id: body.privacy_id
            }
            const createdPlan = await planService.createNewPlan(newPlan);
            return res.status(201).send({
                status: "ok",
                data: createdPlan
            });
        } catch (error) {
            return res.status(error?.status || 500).send({
                status: "failed",
                data: {
                    error: error?.message || error
                }
            })
        }
    },
    destroyPlan: async (req, res) => {
        try {
            const { planId } = req.params;
            if (!planId) {
                res.status(500).send({
                    status: "failed",
                    data: {
                        error: "parameter: 'planId' can't be empty"
                    }
                })
            }
            await planService.destroyPlan({ planId });
            res.status(204).send({status: "OK"});
        } catch (error) {
            return res.status(error?.status || 500).send({
                data: {
                    error: error?.message || error
                }
            })
        }
    }
};

module.exports = plan;