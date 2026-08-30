const express = require('express');
const UserRouters = require('./routes/UserRouters');
const AdminRouters = require('./routes/AdminRouters');
const HosptialRouters = require('./routes/hosptialrouters');

const db = require('./db');

const app = express();
app.use(express.json());

app.use('/', UserRouters);
app.use('/', AdminRouters);
app.use('/', HosptialRouters);

app.listen(4000, () => {
    console.log('server is running on port 4000');
});