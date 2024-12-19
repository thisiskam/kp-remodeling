import express from "express"
import volleyball from "volleyball"
import { blogRouter } from "./blogs.js"

const apiRouter = express.Router();

apiRouter.use(volleyball)

apiRouter.use("/blog", blogRouter);



//error handling
apiRouter.use((err, req, res, next) => {
    console.error(`[ERROR]: ${err.message || err}`);
    res.status(err.status || 500).send({
      error: err.message || "Internal Server Error",
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  });

export { apiRouter }