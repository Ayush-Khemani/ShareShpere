const pool = require('../db/db');

async function GetItems(req, res) {
  try {
    const [rows] = await pool.execute(
      `SELECT IT.id as item_id,
              IT.name as item_name, 
              IT.category, 
              IT.item_condition, 
              REPLACE(IT.photo_path, '\\\\', '/') as photo_path, 
              US.name as donor_name, 
              US.email as donor_email 
       FROM ITEMS IT 
       JOIN USERS US ON IT.USER_ID = US.ID 
       WHERE IT.is_approved = ?`,
      [true]
    );

    if (rows.length === 0) {
      return res.json({
        msg: "No items available for donations"
      });
    }

    res.status(200).json({ items: rows });
  } catch (err) {
    console.log("Error fetching items", err);
    res.status(500).json({ msg: "Internal server error" });
  }
}

module.exports = { GetItems };
