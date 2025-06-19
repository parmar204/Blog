const express = require("express")
const { adminLogin, getAllComments, getAllBlogsAdmin, deleteCommentById, approveComment, getDashboard } = require("../controllers/adminController")
const auth = require("../middlewares/authMiddleware")

const router = express.Router()

router.post("/login", adminLogin)
router.get("/comments", auth, getAllComments)
router.get("/blogs", auth, getAllBlogsAdmin)
router.post("/delete-comment", auth, deleteCommentById)
router.post("/approve-comment", auth, approveComment)
router.get("/dashboard", auth, getDashboard)

module.exports = router