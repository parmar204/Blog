const express = require("express");
const { addBlog, getAllBlogs, getBlogById, deleteBlogById, togglePublish, addComment, getBlogComment, generateContent } = require("../controllers/blogController");
const upload = require("../middlewares/imageUpload");
const auth = require("../middlewares/authMiddleware");

const router = express.Router()

router.post('/add', auth, upload.single('image'), addBlog)
router.get('/all', getAllBlogs)
router.get('/:blogId', getBlogById)
router.post('/delete', auth, deleteBlogById)
router.post('/toggle-publish', auth, togglePublish)

router.post('/addComment', addComment)
router.post('/comments', getBlogComment)

router.post('/generate', auth, generateContent)

module.exports = router