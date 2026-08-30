require('dotenv').config();
const express = require('express');
const bookRouter = require('./src/router/bookroutes');
const issueBookRouter = require('./src/router/IssueBookRoutes');
const userRouter = require('./src/router/UserRouters');
const db = require('./src/config/db');

const app = express();


db();


app.use(express.json());


const requestLogger = (req, res, next) => {
    console.log(`${req.method} ${req.url} | Time: ${new Date().toISOString()}`);
    next();
};
app.use(requestLogger);


app.get('/', (req, res) => {
    res.json('Welcome To Library Management API');
});

app.get('/health', (req, res) => {
    res.status(200).json({
        status: "OK",
        message: "Server is running successfully"
    });
});


app.use('/books', bookRouter);
app.use('/issue-books', issueBookRouter);
app.use('/users', userRouter);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});