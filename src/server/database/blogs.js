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

const fetchBlogsWithHeaderImage = async () => {
    try {
      const SQL = /*sql*/ `
      SELECT 
        b.id,
        b.title, 
        b.created_at, 
        (SELECT image_url FROM blog_images WHERE blog_images.blog_id = b.id LIMIT 1) AS header_image,
        trim(
          regexp_replace(
            array_to_string(
              array(
                SELECT unnest(string_to_array(b.content, ' ')) 
                LIMIT 30
              ), 
              ' '
            ), 
            '\\s+', 
            ' ', 
            'g'
          )
        ) AS preview
        FROM blogs b;
        `;
      const response = await db.query(SQL);
      console.log(response.rows);
      return response.rows;
    } catch (error) {
        console.log("error fetching blogs:", error);
      throw error;
    }
  };

  const fetchSingleBlog = async (blogId) => {
    try {
      const SQL = /*sql*/ `
    SELECT * FROM blogs WHERE id =$1
    `;
      const response = await db.query(SQL,[blogId]);
      console.log(response.rows);
      return response.rows;
    } catch (error) {
        console.log("error fetching blogs:", error);
      throw error;
    }
  };

const fetchBlogImages = async (blogId) => {
    try {
        const SQL = /*sql*/ `
        SELECT * FROM blog_images WHERE blog_id = $1
        `;
        const response = await db.query(SQL, [blogId])
        return response.rows
    } catch (error) {
        console.log("unable to fetch blog images", error);
        throw error;
        
    }
}

const fetchFirstBlogImage = async (blogId) => {
    try {
        const SQL = /*sql*/ `
        SELECT * FROM blog_images WHERE blog_id = $1
        `;
        const response = await db.query(SQL, [blogId])
        return response.rows[0]
    } catch (error) {
        console.log("unable to fetch blog images", error);
        throw error;
    }
}

export { 
    createBlogPost, 
    addBlogImage,
    fetchBlogsWithHeaderImage,
    fetchBlogImages,
    fetchFirstBlogImage,
    fetchSingleBlog
};