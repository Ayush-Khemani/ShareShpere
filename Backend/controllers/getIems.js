const pool = require('../db/db');


async function GetItems(req, res) {

    try {

            const [rows] = await pool.execute('SELECT IT.name as item_name, IT.category, IT.item_condition, IT.photo_path, US.name as donor_name, US.email donor_email FROM ITEMS IT JOIN USERS US ON IT.USER_ID = US.ID where is_approved = ?', [true]);

            if (rows.length === 0) {
                return res.json({
                    msg : "No items available for donations"
                })
            }

        res.status(200).json({items : rows});

    }catch(err) {
        console.log("Error fetching items", err);
        res.status(500).json({msg : "Internal server error"});
        
    }
}


module.exports = {GetItems};