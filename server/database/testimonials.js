import db from "./client.js"

const createTestimonialType = async ({ name, link, image_url }) => {
    try {
        const SQL = /*sql*/ `
            INSERT INTO testimonial_type(name, link, image_url) VALUES ($1, $2, $3) RETURNING *
        `
        const response = await db.query(SQL, [
            name,
            link,
            image_url,
        ])
        return response.rows[0]
    } catch (error) {
        throw error
    }
}

const createTestimonial = async ({ customer, review, review_type, review_date }) => {
    try {
        const SQL = /*sql*/ `
            INSERT INTO testimonials(customer, review, review_type, review_date) VALUES ($1, $2, $3, $4) RETURNING *
        `
        const response = await db.query(SQL, [
            customer, 
            review, 
            review_type, 
            review_date
        ])
        return response.rows[0]
    } catch (error) {
        throw error
    }
}

const fetchAllTestimonials = async () => {
    try {
        const SQL = /*sql*/ `
            SELECT 
                testimonials.*, 
                testimonial_type.link AS type_link,
                testimonial_type.image_url AS type_image_url
            FROM testimonials
            LEFT JOIN testimonial_type 
            ON testimonials.review_type = testimonial_type.id
            ORDER BY testimonials.review_date DESC;
        `;
        const result = await db.query(SQL);
        return result.rows;
    } catch (error) {
        console.error("Error fetching all testimonials:", error);
        throw error;
    }
};

export {
    createTestimonialType,
    createTestimonial,
    fetchAllTestimonials
}