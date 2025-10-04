const pool = require( "../db/db.js");

const createSubscription = async (userId, searchQuery, category) => {
  // Insert subscription
  const [insertResult] = await pool.query(
    `INSERT INTO subscriptions (user_id, search_query, category)
     VALUES (?, ?, ?)`,
    [userId, searchQuery, category]
  );

  // Fetch the inserted row by its ID
  const [rows] = await pool.query(
    'SELECT * FROM subscriptions WHERE id = ?',
    [insertResult.insertId]
  );

  if (!rows || rows.length === 0) {
    throw new Error('Subscription not found after insert');
  }

  return rows[0];
};


const getSubscriptionsByCategoryOrKeyword = async (category, keyword) => {
  const result = await pool.query(
    `SELECT * FROM subscriptions 
     WHERE category = ? OR LOWER(search_query) LIKE LOWER(?)`,
    [category, `%${keyword}%`]
  );
  return result.rows;
};

async function getMatchingSubscriptions({ name, category, item_condition }) {
  const [rows] = await pool.execute(
    `SELECT * FROM subscriptions 
     WHERE (search_query = ? OR search_query IS NULL) 
       AND (category = ? OR category IS NULL) 
       AND (item_condition = ? OR item_condition IS NULL)`,
    [name, category, item_condition]
  );
  return rows;
}

async function createNotification({ user_id, item_name, category, item_condition, message }) {
  await pool.execute(
    `INSERT INTO notifications (user_id, item_name, category, item_condition, message) 
     VALUES (?, ?, ?, ?, ?)`,
    [user_id, item_name, category, item_condition, message]
  );
}


module.exports = {
    getSubscriptionsByCategoryOrKeyword,
    createSubscription,
    createNotification,
    getMatchingSubscriptions
};