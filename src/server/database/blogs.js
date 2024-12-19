import db from "./client.js"

const createBlogPost = async ({ title , content }) => {
    try {
        const SQL = /*sql*/ `
            INSERT INTO blogs(title, content) VALUES ($1, $2) RETURNING *
        `
        const response = await db.query(SQL, [
            title,
            content,
        ])
        return response.rows[0]
    } catch (error) {
        throw error
    }
}

const addBlogImage = async ({ blog_id, image_url}) => {
    try {
        const SQL = /*sql*/ `
            INSERT INTO blog_images(blog_id, image_url) VALUES ($1, $2) RETURNING *
        `
        const response = await db.query(SQL, [
            blog_id,
            image_url,
        ])
        return response.rows[0]
    } catch (error) {
        
    }
}

export { 
    createBlogPost, 
    addBlogImage 
};