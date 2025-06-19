const jwt = require("jsonwebtoken");
const Blog = require("../models/Blog");
const Comment = require("../models/Comment");

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email!==process.env.ADMIN_EMAIL || password!== process.env.ADMIN_PASSWORD) {
            return res.status(400).json({success: false, message: "Invalid credentials"})
        }
        const token = jwt.sign({email}, process.env.JWT_SECRET)
        res.status(200).json({success: true, token})
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: error.message})
    }
}

const getAllBlogsAdmin = async (req, res) => {
    try {
        const blogs = await Blog.find({}).sort({createdAt: -1})
        res.status(200).json({success: true, blogs})
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find({}).populate("blog").sort({createdAt: -1})
        res.status(200).json({success: true, comments})
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

const getDashboard = async (req, res) => {
    try {
        const recentBlogs = await Blog.find({}).sort({createdAt: -1}).limit(5)
        const blogs = await Blog.countDocuments()
        const comments = await Comment.countDocuments()
        const drafts = await Blog.countDocuments({isPublished: false})
        const dashboardData = {
            recentBlogs, blogs, comments, drafts
        }
        res.status(200).json({success: true, dashboardData})
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

const deleteCommentById = async (req, res) => {
    try {
        const {id} = req.body
        await Comment.findByIdAndDelete(id)
        res.status(200).json({success: true, message: "Comment deleted Successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

const approveComment = async (req, res) => {
    try {
        const {id} = req.body
        await Comment.findByIdAndUpdate(id, {isApproved: true})
        res.status(200).json({success: true, message: "Comment Approved Successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = { adminLogin, getAllBlogsAdmin, getAllComments, getDashboard, approveComment, deleteCommentById }