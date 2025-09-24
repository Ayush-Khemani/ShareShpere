const {DonateItemSchema} = require('../validations/itemSchema');

function validateDonateItem(req, res, next) {

    const resp = DonateItemSchema.safeParse(req.body);
    if (!resp.success) {
        const errs = resp.error.issues.map(err => err.message);
        return res.status(400).json({err : errs});
    }

    next();

}

module.exports = {
    validateDonateItem
}