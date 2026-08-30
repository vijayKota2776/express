const express=require('express');
const {register,login,profile}=require('../controllers/UserControllers');
const authMiddleWare=require('../middleWare/authMiddleware');

const router=express.Router();

router.post('/register',register);
router.post('/login',login);
router.get('/profile',authMiddleWare,profile);

module.exports=router;