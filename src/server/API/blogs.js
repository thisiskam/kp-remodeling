import express from "express";
import {
    fetchBlogsWithHeaderImage,
    fetchBlogImages,
    fetchFirstBlogImage, 
    fetchSingleBlog } from "../database/blogs.js";

const blogRouter = express.Router();

// GET all blogs
blogRouter.get("/", async (req, res, next) => {
    try {
        const blogs = await fetchBlogsWithHeaderImage();
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

// GET all images for a specific blog
blogRouter.get("/:id/images", async (req, res, next) => {
    try {
        const blogId = req.params.id
        const images = await fetchBlogImages(blogId);
        res.send(images);
    } catch (error) {
        next(error);
        
    }
})

// GET First blog image for blog header
blogRouter.get("/:id/image", async (req, res, next) => {
    try {
        const blogId = req.params.id
        const image = await fetchFirstBlogImage(blogId);
        res.send(image);
    } catch (error) {
        next(error);
        
    }
})

export { blogRouter };
