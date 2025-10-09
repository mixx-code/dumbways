import { Router } from "express";

import { login, logout, prosesLogin, register, registerUser } from "../controllers/authController.js";

const router = Router()

router.get('/', login)
router.post('/prosesLogin', prosesLogin)
router.get('/register', register)
router.post('/addUser', registerUser);
router.post('/logout', logout)
export default router;