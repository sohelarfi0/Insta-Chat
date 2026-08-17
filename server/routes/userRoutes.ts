import { Router } from "express"
import {  getProfile, getUsers, searchUsers, updatedSProfile } from "../controllers/userController.js";
import upload from "../middlewares/upload.js";


const userRouter = Router();


userRouter.get('/',getUsers)
userRouter.get('/search',searchUsers)
userRouter.get('/profile', getProfile)
userRouter.put('/profile', upload.single("avatar"), updatedSProfile)



export default userRouter;