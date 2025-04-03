import db from "./client.js";

const createPreviousWork = async ({ title , description }) => {
    try {
        const SQL = /*sql*/ `
            INSERT INTO previous_work(title, work_description) VALUES ($1, $2) RETURNING *
        `
        const response = await db.query(SQL, [
            title,
            description
        ])
        return response.rows[0]
    } catch (error) {
        throw error
    }
}

const createPreviousWorkImage = async ({ previousWorkId, imageUrl }) => {
    try {
        const SQL = /*sql*/ `
            INSERT INTO previous_work_images(previous_work_id, image_url)VALUES ($1, $2) RETURNING *
        `
        const response = await db.query(SQL, [
            previousWorkId,
            imageUrl
        ])
        return response.rows[0]
    } catch (error) {
        throw error
    }
}

const fetchPreviousWork = async () => {
    try {
        const SQL = /*sql*/ `
        SELECT pw.id, pw.title, pw.work_description, pwi.image_url
        FROM previous_work pw
        LEFT JOIN previous_work_images pwi 
        ON pw.id = pwi.previous_work_id
        ORDER BY pw.id
    `;

    const response = await db.query(SQL);

    const workMap = new Map();

    response.rows.forEach(row => {
        if (!workMap.has(row.id)) {
            workMap.set(row.id, {
                id: row.id,
                title: row.title,
                work_description: row.work_description,
                images: []
            });
        }
        if (row.image_url) {
            workMap.get(row.id).images.push(row.image_url);
        }
    });

    return Array.from(workMap.values());
    } catch (error) {
        throw error;
    }
}

const fetchTwentyRandomImages = async () => {
    try {
        const SQL = /*sql*/ `
            SELECT image_url FROM previous_work_images
            ORDER BY RANDOM()
            LIMIT 20
        `;
        const response = await db.query(SQL);
        return response.rows.map(row => row.image_url);
    } catch (error) {
        throw error;
    }
}


export {
    createPreviousWork,
    createPreviousWorkImage,
    fetchPreviousWork,
    fetchTwentyRandomImages
};