const express = require('express');
const app = express();
require('dotenv').config();
const authRoutes = require('./routes/auth');
const userRoutes= require('./routes/user');
const itemRoutes = require('./routes/items');
const adminRoutes = require('./routes/admin');  
const userDashboardRoutes = require('./routes/userDashboard');  
const cors = require('cors');
app.use(cors());
app.use('/uploads', express.static('uploads'));
app.use(express.json());



app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/item', itemRoutes);
app.use('/admin', adminRoutes);  
app.use('/dashboard', userDashboardRoutes); 

app.get('/', function (req, res) {
    req.query.search
})

app.listen(3000, function() {
    console.log("Express app listening on port 3000");
})


