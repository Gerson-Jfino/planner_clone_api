const mysql = require("./mysql");
module.exports = {
    getAllPlans: async () => {
        try {
            const result = await mysql.execute("SELECT * FROM plan;");
            const plans = {
                plans: result.map(res => {
                    return {
                        id: res.id,
                        name: res.name,
                        privacy_id: res.privacy_id
                    }
                }),
                total: result.length
            };
            return plans;
        } catch (error) {
            throw {
                status: error?.status || 500,
                message: error?.message || error
            };
        }
    },
    getOnePlan: async (params) => {
        try {
            const result = await mysql.execute("SELECT * FROM plan WHERE id = ?;", [params.id]);
            const plan = {
                plan: result[0]
            }
            return plan;
        } catch (error) {
            throw error;
        }
    },
    createPlan: async (params) => {
        try {
            const privacy = await mysql.execute("SELECT * FROM privacy WHERE id = ?;", [params.privacy_id]);
            if (privacy.length === 0) {
                throw {
                    status: 400,
                    message: `Can't find privacy with the id '${params.privacy_id}'`
                };
            }
            const result = await mysql.execute("INSERT INTO plan (name, privacy_id) VALUES (?, ?);", [params.name, params.privacy_id])
            const createdPlan = await mysql.execute("SELECT * FROM plan WHERE id = ?;", [result.insertId]);
            return createdPlan;
        } catch (error) {
            throw error;
        }
    },
    destroyPlan: async (params) => {
        try {
            const plan = await mysql.execute("SELECT * FROM plan WHERE id = ?;", [params.planId]);
            if(plan.length === 0) {
                throw {
                    status: 400,
                    message: `Can't find plan with id '${params.planId}'`
                }
            }
            await mysql.execute("DELETE FROM plan WHERE id = ?;", [params.planId]);
            return;
        } catch (error) {
            throw error;
        }
    }
}