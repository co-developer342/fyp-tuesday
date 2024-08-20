import express from 'express'
import authController, { getAllOrdersController, getOrdersController, orderStatusController, updateProfileController } from '../Controller/authController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';


const router=express.Router()
router.post('/register',authController.registerController)

//Login POST
router.post('/login',authController.loginController)
// Forgot Password
router.post('/forgot-password',authController.forgotPasswordController)

//test routes
router.get("/test",requireSignIn,isAdmin,authController.testController)

// protected route path
router.get('/user-auth',requireSignIn,(req,res)=>{
    res.status(200).send({ok:true})
})
// protected route path
router.get('/admin-auth',requireSignIn,isAdmin,(req,res)=>{
    res.status(200).send({ok:true})
})

router.put('/profile',requireSignIn,updateProfileController)


router.get("/orders", requireSignIn, getOrdersController);

router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);
router.put(
    "/order-status/:orderId",
    requireSignIn,
    isAdmin,
    orderStatusController
  );


export default router