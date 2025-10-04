const pool = require('../db/db');

// Get user's own donated items
async function getMyItems(req, res) {
    const userId = req.user.id;

    try {
        const [rows] = await pool.execute(
            `SELECT id as item_id, name as item_name, category, item_condition, 
             photo_path, is_approved, created_at 
             FROM ITEMS 
             WHERE user_id = ? 
             ORDER BY created_at DESC`,
            [userId]
        );

        res.status(200).json({ items: rows });
    } catch (err) {
        console.error('Error fetching user items:', err);
        res.status(500).json({ msg: 'Internal server error' });
    }
}

// Delete user's own item
async function deleteMyItem(req, res) {
    const { itemId } = req.params;
    const userId = req.user.id;

    try {
        // Check if item belongs to user
        const [rows] = await pool.execute(
            'SELECT * FROM ITEMS WHERE id = ? AND user_id = ?',
            [itemId, userId]
        );

        if (rows.length === 0) {
            return res.status(403).json({ msg: 'You can only delete your own items' });
        }

        await pool.execute('DELETE FROM ITEMS WHERE id = ?', [itemId]);
        res.status(200).json({ msg: 'Item deleted successfully' });
    } catch (err) {
        console.error('Error deleting item:', err);
        res.status(500).json({ msg: 'Internal server error' });
    }
}

module.exports = {
    getMyItems,
    deleteMyItem
};