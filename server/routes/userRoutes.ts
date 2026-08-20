import { Router } from "express"
import {  getProfile, getUsers, searchUsers, updatedSProfile } from "../controllers/userController.js";
import upload from "../middlewares/upload.js";
import { authMiddleware } from "../middlewares/auth.js";


const userRouter = Router();


userRouter.get('/',getUsers)
userRouter.get('/search',searchUsers)
userRouter.get('/profile',authMiddleware, getProfile)
userRouter.put('/profile', upload.single("avatar"),authMiddleware, updatedSProfile)



export default userRouter;