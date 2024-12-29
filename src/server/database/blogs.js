import db from "./client.js"

const createBlogPost = async ({ title , summary, header_img }) => {
    try {
        const SQL = /*sql*/ `
            INSERT INTO blogs(title, summary, header_img) VALUES ($1, $2, $3) RETURNING *
        `
        const response = await db.query(SQL, [
            title,
            summary,
            header_img,
        ])
        return response.rows[0]
    } catch (error) {
        throw error
    }
}

const addBlogContent = async ({ blog_id, content_type, content, position, bs_styles}) => {
    try {
        const SQL = /*sql*/ `
            INSERT INTO blog_content(blog_id, content_type, content, position, bs_styles) VALUES ($1, $2, $3, $4, $5) RETURNING *
        `
        const response = await db.query(SQL, [
            blog_id,
            content_type, 
            content, 
            position,
            bs_styles
        ])
        return response.rows[0]
    } catch (error) {
        
    }
}

const fetchBlogs = async () => {
    try {
      const SQL = /*sql*/ `
      SELECT * FROM blogs
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
      const query = `
        SELECT 
          b.id AS blog_id,
          b.title,
          b.summary,
          b.header_img,
          b.created_at,
          b.updated_at,
          bc.id AS content_id,
          bc.content_type,
          bc.content,
          bc.position,
          bc.bs_styles
        FROM 
          blogs b
        LEFT JOIN 
          blog_content bc ON b.id = bc.blog_id
        WHERE 
          b.id = $1
        ORDER BY 
          bc.position;
      `;
      const result = await db.query(query, [blogId]);
  
      if (result.rows.length === 0) {
        return null;
      }
  
      const blog = {
        id: result.rows[0].blog_id,
        title: result.rows[0].title,
        summary: result.rows[0].summary,
        header_img: result.rows[0].header_img,
        created_at: result.rows[0].created_at,
        updated_at: result.rows[0].updated_at,
        content: []
      };
  
      result.rows.forEach(row => {
        if (row.content_id) {
          blog.content.push({
            content_id: row.content_id,
            content_type: row.content_type,
            content: row.content,
            position: row.position,
            bs_styles: row.bs_styles
          });
        }
      });
  
      return blog;
  
    } catch (error) {
      console.error("Error fetching blog with content:", error);
      throw error;
    }
  };


export { 
    createBlogPost, 
    addBlogContent,
    fetchBlogs,
    fetchSingleBlog
};