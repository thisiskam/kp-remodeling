import express from "express";
const portfolioRouter = express.Router();
import { 
    fetchPreviousWork, 
    fetchTwentyRandomImages} from "../database/portfolio.js";

// get all previous work
portfolioRouter.get('/', async (req, res, next) => {
    try {
        const work = await fetchPreviousWork();
        res.send(work);
    } catch (error) {
        next(error);
        
    }
})


// random images for main page
portfolioRouter.get("/random-images", async (req, res, next) => {
    try {
        const images = await fetchTwentyRandomImages();
        res.json(images);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch images" });
    }
});


export {
    portfolioRouter
}