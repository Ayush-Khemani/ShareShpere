const jwt = require('jsonwebtoken');
const { email } = require('zod');
const bcrypt = require('bcrypt');
const salt_Rounds = 10;
const pool = require('../db/db');
const JWTKey = process.env.JWT_SECRET;


// Login Controllers


function loginUser(req, res) {
    const user = req.user;
    // console.log(user);
    // console.log(user.ID);
    // console.log(user.id);
    
    
    // Hite id aai aa
    console.log(user);
    
    const JWTtoken = jwt.sign(user , JWTKey, {expiresIn : '1h'});
    console.log(user);
    
    res.json({
        token : JWTtoken,
        role: user.role
    })

    // Responsibilty of frontend to store it in browser.
}


// Registeration Controllers
async function registerUser(req, res) {
    const data = req.body;
    // Hash the password:
    const hashedPassword = await bcrypt.hash(data.password, salt_Rounds);

    // Store the data in the database:
    try {
        const resp = await pool.execute('Insert into users (name, email, password) values (?, ?, ?)', [data.name, data.email, hashedPassword]);
        res.status(201).json({msg : "User Sucessfully created"});

    }catch(err) {

        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ msg: "Email already exists" });
        }
        else {
            console.log("Failed creating user", err);
            return res.status(500).json({msg : "Internal Server error"});
        }

    }


}



module.exports = {
    loginUser,
    registerUser
}