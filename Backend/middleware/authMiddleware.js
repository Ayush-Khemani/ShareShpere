const {loginSchema, registerationSchema} = require('../validations/authSchema')
const pool = require('../db/db');
const bcrypt = require('bcrypt');

function validateLogin(req, res, next) {
    const resp = loginSchema.safeParse(req.body);

    if (!resp.success) {
        const err_msg =  resp.error.issues.map(err => err.message);

        return res.status(400).json({ errors : err_msg});
    }

    next();
}

// second middleware:
// Check if the user exists in the database, but searching email and hashed password.

// if it does then attach the user to the req object and then next()

// if it does not then return res.status(401).send("Invalid Login Credentials")

async function checkLoginCredentials(req, res, next) {

    try {
        const [rows] = await pool.execute('SELECT * FROM users WHERE EMAIL = ?', [req.body.email]);

        if (rows.length === 0) {
            return res.status(401).json({msg : "Invalid Login Credentials"});
        }

        const user = rows[0];
        
        const match = await bcrypt.compare(req.body.password, user.PASSWORD);

        if (!match) {

        return res.status(401).json({
            msg : "Invalid Login Credentials"
        })
        }

        // Attach the user to the req object
        req.user = {
            id : user.id,
            email : user.EMAIL,
            role : user.ROLE,
        }
        next();
    

    }
    catch(err) {
        console.log("Login check failed", err);
        res.status(500).json({msg : "Server error during login check"});
        
    }
    
}


// Middleware for the registeration input validation using zod.  

function validateRegisteration(req, res, next) {
    const resp = registerationSchema.safeParse(req.body);

    if (!resp.success) {
        const errMsg = resp.error.issues.map(err => err.message);
        return res.status(400).json({msg : errMsg});
    }

    next();
}




module.exports = {
    validateLogin,
    checkLoginCredentials,
    validateRegisteration
}