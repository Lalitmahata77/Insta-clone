import express from "express"
import { authenticate } from "../middleware/authMiddleware.js"
import upload from "../middleware/multer.js"
import { addComment, addNewPost, bookmarkPost, deletePost, dislikePost, getAllPost, getCommentsOfPost, getUserPost, likePost } from "../contoller/postController.js"
const router = express.Router()

router.route("/createpost").post(authenticate,upload.single("image"), addNewPost)
router.route("/getAllPost").get(authenticate,getAllPost)
router.route("/userpost/all").get(authenticate,getUserPost)
router.route("/:id/like").post(authenticate,likePost)
router.route("/:id/dislike").post(authenticate,dislikePost)
router.route("/:id/addcomment").post(authenticate,addComment)
router.route("/:id/comment/all").get(authenticate,getCommentsOfPost)
router.route("/delete/:id").delete(authenticate,deletePost)
router.route("/:id/bookmark").get(authenticate,bookmarkPost)
export default router