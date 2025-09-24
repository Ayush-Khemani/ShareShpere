const pool = require('../db/db');

async function SearchAndFilterItems(req, res) {
    // Get the query Params
    
    try {
        const search = req.query.search;
        const condition = req.query.condition;
        const category = req.query.category;

        let query = `SELECT IT.name as item_name, IT.category as item_category, IT.item_condition, IT.photo_path as item_photo, US.name as donor_name, US.email donor_email FROM ITEMS IT JOIN USERS US ON IT.USER_ID = US.ID where is_approved = ?`;

        let queryParams = [true];

        if (search) {
            query+= ` and IT.name like ?`;
            queryParams.push(`%${search}%`);
        }
        if (category) {
            query+= ` and IT.category = ? `;
            queryParams.push(category);
        }
        if (condition) {
            query+= ` and IT.item_condition = ?`;
            queryParams.push(condition);
        }

        const [rows] = await pool.execute(query, queryParams);

        if (rows.length ===0) {
            return res.status(200).json({
                msg : "No Items Found"
            })
        }

        res.status(200).json({items : rows});


    }catch(err) {
        console.log("error while searching and filtering", err);
        res.status(500).json({ msg : "Internal Server Error"});
    }
}

module.exports = {
    SearchAndFilterItems
}