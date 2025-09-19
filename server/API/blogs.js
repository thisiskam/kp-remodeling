import express from "express";
import {
    fetchBlogs,
    fetchSingleBlog } from "../database/blogs.js";

const blogRouter = express.Router();

// GET all blogs
blogRouter.get("/", async (req, res, next) => {
    try {
        const blogs = await fetchBlogs();
        res.send(blogs);
    } catch (error) {
        next(error);
        
    }
})

// GET single Blog
blogRouter.get("/:id", async (req, res, next) => {
    try {
        const blogId = req.params.id
        const blog = await fetchSingleBlog(blogId);
        res.send(blog);
    } catch (error) {
        next(error);
        
    }
})

export { blogRouter };
