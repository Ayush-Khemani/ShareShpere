const jwt = require('jsonwebtoken');	
	// - Read the token from the request header -> authorization,
	// - verfiy it using jwt
    //     -  IF it is verified, then attach then decode the user from the token, and attach it with the req obj and next,
	// // -  If it is not verified, then Unauthorized access.


function authenticateUserFromToken(req, res, next) {

    // Since token format is usually : Bearer <token>
    const authHeader = req.headers['authorization'];
    
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            msg : "Your are not logged in"
        })
    }

    // Verify it using jwt, since verify throws an error, use try-catch

    try{
        
        

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        

        req.user = decoded;
        console.log(req.user);
        
        next();


    }catch(err) {
        console.log("Token not varified", err);
        return res.status(401).json({
            msg : "You are unauthorized"
        })
    }

}

module.exports = {
    authenticateUserFromToken
}