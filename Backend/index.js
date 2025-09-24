const express = require('express');
const app = express();
require('dotenv').config();
const authRoutes = require('./routes/auth');
const userRoutes= require('./routes/user');
const itemRoutes = require('./routes/items');

app.use(express.json());



app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/item', itemRoutes);

app.get('/', function (req, res) {
    req.query.search
})

app.listen(3000, function() {
    console.log("Express app listening on port 3000");
})


