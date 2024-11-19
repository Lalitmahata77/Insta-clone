import express from "express"
import { editProfile, followOrUnfollow, getProfile, getSuggestedUsers, login, logout, register } from "../contoller/userController.js"
import { authenticate } from "../middleware/authMiddleware.js"
import upload from "../middleware/multer.js"
const router = express.Router()

router.route("/").post(register)
router.route("/login").post(login)
router.route("/logout").post(logout)
router.route("/:id").get(authenticate,getProfile)
router.route("/edit/:id").put(authenticate,upload.single("profilePhoto"),editProfile)
router.route("/").get(getSuggestedUsers)
router.route('/followorunfollow/:id').post(authenticate, followOrUnfollow);
export default router