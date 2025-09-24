const zod = require('zod');

const loginSchema = zod.object({
    email : zod.email(),
    password : zod.string().min(8, {message : "Password must be 8 characters long"})
    .regex(/[A-Z]/, {message : "Password must contain at least one uppercase letter"})
    .regex(/[a-z]/, {message : "Password must contain at least one lowercase letter" } )
    .regex(/[0-9]/, {message : "Password must contain at least one number" })
})


const registerationSchema = zod.object({
    name : zod.string(),
    email : zod.email(),
    password : zod.string().min(8, {message : "Password must be 8 characters long"})
    .regex(/[A-Z]/, {message : "Password must contain at least one uppercase letter"})
    .regex(/[a-z]/, {message : "Password must contain at least one lowercase letter" } )
    .regex(/[0-9]/, {message : "Password must contain at least one number" })
    
})

module.exports = {
    loginSchema,
    registerationSchema
}


