const express = require('express');
const { issueBook, returnBook } = require('../controllers/IssueBookControllers');
const authMiddleWare= require ('../middleWare/authMiddleware');

const router = express.Router();

router.post('/',authMiddleWare, issueBook);
router.put('/:id',authMiddleWare, returnBook);

module.exports = router;