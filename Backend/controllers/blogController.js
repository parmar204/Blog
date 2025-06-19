const main = require("../configs/gemini");
const Blog = require("../models/Blog");
const Comment = require("../models/Comment");

const addBlog = async (req, res) => {
  try {
    const { title, subTitle, description, category, isPublished } = JSON.parse(req.body.blog);
    const image = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : null;

    if (!title || !description || !category || !isPublished || !image) {
      return res.status(400).json({ success: false, message: "Required Fields are missing" });
    }

    await Blog.create({
      title,
      subTitle,
      description,
      category,
      isPublished,
      image,
    });

    res.status(200).json({ success: true, message: "Blog added successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({isPublished: true})
        res.status(200).json({success: true, blogs})
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

const getBlogById = async (req, res) => {
    try {
        const {blogId} = req.params;
        const blog = await Blog.findById(blogId)
        if (!blog) {
            res.status(400).json({ success: false, message: "Blog not found" });
        }
        res.status(200).json({ success: true, blog });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

const deleteBlogById = async (req, res) => {
    try {
        const {id} = req.body;
        await Blog.findByIdAndDelete(id)
        await Comment.deleteMany({blog: id})
        res.status(200).json({ success: true, message: "Blog Deleted Successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

const togglePublish = async (req, res) => {
    try {
        const {id} = req.body
        const blog = await Blog.findById(id)
        blog.isPublished = !blog.isPublished
        await blog.save()
        res.status(200).json({ success: true, message: "Blog status updated" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

const addComment = async (req, res) => {
    try {
        const {blog, name, content} = req.body
        await Comment.create({
            blog,name,content
        })
        res.status(200).json({ success: true, message: "Comment Added For Review" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

const getBlogComment = async (req, res) => {
    try {
        const {blogId} = req.body
        const comments = await Comment.find({blog: blogId, isApproved: true}).sort({createdAt: -1})
        res.status(200).json({ success: true, comments });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

const generateContent = async (req, res) => {
    try {
        const {prompt} = req.body
        const content = await main(prompt+' Generate a blog content for this topic in simple text format')
        res.status(200).json({ success: true, content });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = {addBlog, getAllBlogs, getBlogById, deleteBlogById, togglePublish, addComment, getBlogComment, generateContent}