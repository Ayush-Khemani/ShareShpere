function checkAdmin(req, res, next) {
    const role = req.user?.role?.toLowerCase();
    console.log('checkAdmin role:', role); // debug
    if (role !== 'admin') {
        return res.status(403).json({ msg: 'Admin access required' });
    }
    next();
}

module.exports = { checkAdmin };
module.exports = { checkAdmin };