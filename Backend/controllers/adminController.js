const pool = require('../db/db.js');
// Get all pending items for approval
async function getPendingItems(req, res) {
    console.log('REQ.USER in getPendingItems:', req.user); // debug
    try {
        const [rows] = await pool.execute(
            `SELECT IT.id as item_id, IT.name as item_name, IT.category, IT.item_condition, 
             IT.photo_path, IT.created_at, US.name as donor_name, US.email as donor_email, US.id as donor_id
             FROM ITEMS IT 
             JOIN USERS US ON IT.USER_ID = US.ID 
             WHERE IT.is_approved = 0
             ORDER BY IT.created_at DESC`
        );

        console.log('Pending items fetched:', rows.length); // debug
        res.status(200).json({ items: rows });
    } catch (err) {
        console.error('Error fetching pending items:', err);
        res.status(500).json({ msg: 'Internal server error' });
    }
}

// Approve an item
async function approveItem(req, res) {
    const { itemId } = req.params;
    
    try {
        await pool.execute(
            'UPDATE ITEMS SET is_approved = true WHERE id = ?',
            [itemId]
        );

        res.status(200).json({ msg: 'Item approved successfully' });
    } catch (err) {
        console.error('Error approving item:', err);
        res.status(500).json({ msg: 'Internal server error' });
    }
}

// Reject/Delete an item
async function rejectItem(req, res) {
    const { itemId } = req.params;
    
    try {
        await pool.execute('DELETE FROM ITEMS WHERE id = ?', [itemId]);
        res.status(200).json({ msg: 'Item rejected and deleted' });
    } catch (err) {
        console.error('Error rejecting item:', err);
        res.status(500).json({ msg: 'Internal server error' });
    }
}

// Get all users
async function getAllUsers(req, res) {
    try {
        const [rows] = await pool.execute(
            'SELECT id, name, email, role, created_at FROM USERS ORDER BY created_at DESC'
        );

        res.status(200).json({ users: rows });
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ msg: 'Internal server error' });
    }
}

module.exports = {
    getPendingItems,
    approveItem,
    rejectItem,
    getAllUsers
};