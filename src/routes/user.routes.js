import {Router} from 'express';
import {verifyMobile,verifyOTP,registerUser,loginUser} from '../controllers/user.controller.js'
const router = Router();
router.route('/verify-Mobile-no.').post(verifyMobile)
router.route('/verify-OTP').post(verifyOTP)
router.route('/register-user').post(registerUser)
router.route('/login-user').post(loginUser)



export default router;