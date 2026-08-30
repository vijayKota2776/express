const express = require('express');
const routes = require('./routers/routes');

const db = require('./db');

const app = express();
app.use(express.json());


app.use('/', routes);

app.listen(4000, () => {
    console.log('Server is running on port 4000');
}
);