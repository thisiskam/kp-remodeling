import express from "express";
const testimonialRouter = express.Router();

import { fetchAllTestimonials } from "../database/testimonials.js";

// GET all testimonials
testimonialRouter.get("/", async (req, res, next) => {
    try {
        const testimonials = await fetchAllTestimonials();
        res.json(testimonials);
    } catch (error) {
        next(error);
        
    }
})

export {testimonialRouter}