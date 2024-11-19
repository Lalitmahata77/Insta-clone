import express from "express"
import { authenticate } from "../middleware/authMiddleware.js"
import { getMessage, sendMessage } from "../contoller/messageController.js"
const router = express.Router()

router.route("/send/:id").post(authenticate,sendMessage)
router.route("/all/:id").get(authenticate,getMessage)


export default router